import type { Book } from '@org/booklib';
import { pool } from '../db/postgres';
import type { BookResponse, CreateBook } from '@org/booklib';
import { Client as client } from '../db/redis';

function toCamelCase(book: Book): BookResponse{
    return {id: book.id,name: book.name,description: book.description, urlImage: book.url_image, storeId:book.store_id};
}

export async function getAllBooks(userId: number, storeId: number) : Promise<BookResponse[]>{
    const request = await pool.query(`SELECT books.* FROM books JOIN user_store ON books.store_id = user_store.store_id 
        WHERE user_store.user_id = $1 AND books.store_id = $2`, [userId, storeId]);
    const books = [];
    for (const book of request.rows){
        books.push(toCamelCase(book));
    }
    return books;
}

export async function getBook(userId: number, storeId: number, id: number): Promise<BookResponse |null>{
    const res = await pool.query(`SELECT books.* FROM books JOIN user_store ON books.store_id = user_store.store_id 
        WHERE user_store.user_id = $1 AND books.store_id = $2 AND books.id = $3`, [userId, storeId, id]);
    if (res.rows.length === 0){
        return null;
    }
    return toCamelCase(res.rows[0]);
}

export async function deleteBook(id: number, userId: number): Promise<boolean> {
    const res = await pool.query(`DELETE FROM books where id=$1 AND store_id IN 
        (SELECT store_id FROM user_store WHERE user_id = $2) RETURNING store_id`, [id, userId]);
    if (res.rowCount === 0){
        return false;
    }
    const storeId = res.rows[0].store_id;
    await client.del(`books:${userId}:${storeId}`);
    return true;
}

export async function addBook(toadd: CreateBook, userId : number, storeId: number): Promise<BookResponse>{
    const storeResult = await pool.query(`SELECT store_id FROM user_store WHERE user_id = $1 AND store_id = $2`,[userId, storeId]);
    if (storeResult.rows.length === 0) {
        throw new Error('User does not have this store');
    }
    const res = await pool.query(`INSERT INTO books (name, description, url_image, store_id) 
        VALUES ($1, $2, $3, $4) RETURNING *`,[toadd.name, toadd.description, toadd.urlImage, storeId]);

    await client.del(`books:${userId}:${storeId}`);
    return toCamelCase(res.rows[0]);
}

export async function updateBook(id: number,userId: number, newName: string,newDescription: string, newUrlImage: string):Promise<BookResponse | null> {

    const res = await pool.query(`UPDATE books SET name =$1, description=$2, url_image=$3
        WHERE id = $4 AND store_id in (SELECT store_id FROM user_store WHERE user_id = $5)RETURNING *`,[newName,newDescription,newUrlImage, id, userId]);
    if (res.rows.length === 0) {
        return null;
    }
    const book = toCamelCase(res.rows[0]);

    await client.del(`books:${userId}:${book.storeId}`);
    return toCamelCase(res.rows[0]);
}
export async function getBooksUser(userId: number,storeId: number): Promise<BookResponse[]>{
    
    const redisKey = `books:${userId}:${storeId}`;
    const value = await client.get(redisKey);
    if(value){
        return JSON.parse(value);
    }
    const request = await pool.query(`SELECT books.* FROM books JOIN user_store ON books.store_id = user_store.store_id 
        WHERE user_store.user_id = $1 AND books.store_id = $2`, [userId, storeId]);

    const books: BookResponse[] = [];
    for (const book of request.rows){
        books.push(toCamelCase(book));
    }
    await client.set(redisKey, JSON.stringify(books));
    return books;
}