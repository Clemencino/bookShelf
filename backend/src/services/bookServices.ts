import { books } from '../data.ts';

import type { Book } from '../data.ts';
export function getAllBooks() {
    return books;
}
export function getBook(id: number): Book{
    for (book of books) {
        if (book.id === id) {
            return book;
        }
    }
    return null;
}

export function deleteBook(id: number): boolean {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books.splice(i,1);
            return true;
        }
    }
    return false;
}

export function addBook(toadd: string) {
    books.push(toadd);
}