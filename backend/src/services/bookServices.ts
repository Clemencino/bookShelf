import { books } from '../data.ts';
import type { Book } from '../data.ts';
import { pool } from '../db/postgres';

function toCamelCase(book: Book){
    return {id: book.id,name: book.name,description: book.description, urlImage: book.url_image, storeId:book.store_id};
}

export async function getAllBooks() {
    const request = await pool.query('SELECT * from books');
    const books = [];
    for (const book of request.rows){
        books.push(toCamelCase(book));
    }

    return books;
}

export async function getBook(id: number): Book |null{
    const res = await pool.query('SELECT * FROM books where id=$1', [id]);
    if (res.rows.length === 0){
        return null;
    }
    return toCamelCase(res.rows[0]);
}

export async function deleteBook(id: number): boolean {
    const res = await pool.query('DELETE FROM books where id=$1', [id]);
    if (res.rowCount === 1){
        return true;
    }
    return false;
}

export async function addBook(toadd: Omit<Book,'id'>): Book{
    const res = await pool.query(`INSERT INTO books (name, description, url_image, store_id) 
        VALUES ($1, $2, $3, $4) RETURNING *`,[toadd.name, toadd.description, toadd.urlImage, 1]);
    return toCamelCase(res.rows[0]);
}

export async function updateBook(id: number,newName: string,newDescription: string, newUrlImage: string, newStoreId: number):Book | null {

    const res = await pool.query(`UPDATE books SET name =$1, description=$2, url_image=$3, store_id=$4 
        WHERE id = $5 RETURNING *`,[newName,newDescription,newUrlImage, 1, id ]);
    if (res.rows.length === 0) {
        return null;
    }

    return toCamelCase(res.rows[0]);
}