import { books } from '../data.ts';

import type { Book } from '../data.ts';
export function getAllBooks() {
    return books;
}
export function getBook(id: number): Book |null{
    for (const book of books) {
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

export function addBook(toadd: Omit<Book,'id'>): Book{
    let newId = 1;
    for (const book of books) {
        if (book.id >= newId) {
            newId =book.id+ 1;
        }
    }
    const book: Book = {
        id: newId,
        name: toadd.name,
        description: toadd.description,
        urlImage: toadd.urlImage
    };

    books.push(book);
    return book;
}

export function updateBook(id: number,newName: string,newDescription: string, newUrlImage: string):Book | null {

    const book = getBook(id);
    if (book === null){
        return null;
    }
    book.name = newName;
    book.description = newDescription;
    book.urlImage = newUrlImage;

    return book;
}