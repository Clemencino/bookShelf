import type { Book } from '@org/booklib';
import { pool } from '../db/postgres';
import type { BookResponse, CreateBook } from '@org/booklib';


function toCamelCase(book: Book): BookResponse{
    return {id: book.id,name: book.name,description: book.description, urlImage: book.url_image, storeId:book.store_id};
}

export async function getAllBooks() : Promise<BookResponse[]>{
    const request = await pool.query('SELECT * from books');
    const books = [];
    for (const book of request.rows){
        books.push(toCamelCase(book));
    }

    return books;
}

export async function getBook(id: number): Promise<BookResponse |null>{
    const res = await pool.query('SELECT * FROM books where id=$1', [id]);
    if (res.rows.length === 0){
        return null;
    }
    return toCamelCase(res.rows[0]);
}

export async function deleteBook(id: number): Promise<boolean> {
    const res = await pool.query('DELETE FROM books where id=$1', [id]);
    if (res.rowCount === 1){
        return true;
    }
    return false;
}

export async function addBook(toadd: CreateBook, userId : number): Promise<BookResponse>{
    const storeResult = await pool.query(`SELECT store_id FROM user_store WHERE user_id = $1`,[userId]);

    if (storeResult.rows.length === 0){
        console.log("User has no store");
    }
    const storeId = storeResult.rows[0].store_id;
    const res = await pool.query(`INSERT INTO books (name, description, url_image, store_id) 
        VALUES ($1, $2, $3, $4) RETURNING *`,[toadd.name, toadd.description, toadd.urlImage, storeId]);
        console.log(res.rows[0]);
    return toCamelCase(res.rows[0]);
}

export async function updateBook(id: number,newName: string,newDescription: string, newUrlImage: string):Promise<BookResponse | null> {

    const res = await pool.query(`UPDATE books SET name =$1, description=$2, url_image=$3
        WHERE id = $4 RETURNING *`,[newName,newDescription,newUrlImage, id]);
    if (res.rows.length === 0) {
        return null;
    }

    return toCamelCase(res.rows[0]);
}

export async function getBooksUser(userId: number):Promise<BookResponse[]> {
    const request = await pool.query(`SELECT books.* FROM books JOIN user_store ON books.store_id = user_store.store_id
        WHERE user_store.user_id = $1`,[userId]);

    const books: BookResponse[]= [];
    for (const book of request.rows){
        books.push(toCamelCase(book));
    }

    return books;
}