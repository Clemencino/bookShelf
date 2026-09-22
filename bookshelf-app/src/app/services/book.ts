import { Injectable } from '@angular/core';

export interface Book {
    name: string;
    description: string;
    urlImage: string;
}

@Injectable({
    providedIn: 'root'
})
export class BookService {
    loadBooks(): Book[] {
        const savedData = localStorage.getItem('bookshelf');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return [
            { name: "Book1", description: "BlaBlaBla", urlImage:"assets/bookCover1.png" }, 
            { name: "Book2", description: "zzzZZZZ", urlImage:"assets/bookCover1.png" }
        ];
    }

    bookshelf : Book[] = this.loadBooks();

    getBooks() {
        return this.bookshelf;
    }

    addBook(newBook: Book) {
        this.bookshelf.push(newBook);
        this.saveToStorage();
    }

    deleteBook(index: number) {
        this.bookshelf.splice(index, 1);
        this.saveToStorage();
    }

    private saveToStorage() {
        localStorage.setItem('bookshelf', JSON.stringify(this.bookshelf));
    }
}

