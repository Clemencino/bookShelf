import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Book {
    name: string;
    description: string;
    urlImage: string;
}

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) {}
    getBooks(){
        return this.http.get<Book[]>('http://localhost:3000/books');
    /*
    addBook(newBook: Book) {
        this.http.get('/books')
        this.bookshelf.push(newBook);

    }

    deleteBook(index: number) {
        this.bookshelf.splice(index, 1);
  
    }
    */
}
}