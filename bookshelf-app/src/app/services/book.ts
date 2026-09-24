import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Book {
    id: number;
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
        return this.http.get<Book[]>('http://localhost:3000/get_books');
    }

    getBook(id: number){
        return this.http.get<Book>(`http://localhost:3000/get_book/${id}`);
    }
    
    createBook(book: Omit<Book,'id'>){
        return this.http.post<Book>('http://localhost:3000/create_book', book);
    }
    
    deleteBook(id: number){
        return this.http.delete(`http://localhost:3000/delete_book/${id}`);
    }

    updateBook(id: number, book: Omit<Book, 'id'>){
        return this.http.put(`http://localhost:3000/update_book/${id}`, book);
    }
}