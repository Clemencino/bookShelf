import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book, BookResponse, CreateBook } from '@org/booklib'

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) {}
    getBooks(){
        return this.http.get<BookResponse[]>('http://localhost:3000/get_books');
    }

    getBook(id: number){
        return this.http.get<Book>(`http://localhost:3000/get_book/${id}`);
    }
    
    createBook(book: Omit<CreateBook,'id'| 'storeId'>){
        return this.http.post<Book>('http://localhost:3000/create_book', book);
    }
    
    deleteBook(id: number){
        return this.http.delete(`http://localhost:3000/delete_book/${id}`);
    }

    updateBook(id: number, book: Omit<CreateBook, 'id'| 'storeId'>){
        return this.http.put(`http://localhost:3000/update_book/${id}`, book);
    }
}