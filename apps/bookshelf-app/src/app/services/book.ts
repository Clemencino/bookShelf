import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Book, BookResponse, CreateBook } from '@org/booklib'
import { AuthService } from './auth'

@Injectable({
    providedIn: 'root'
})
export class BookService {
    authService = inject(AuthService);
    constructor(private http: HttpClient) {}
    getBooks(storeId: number) {
        const token = this.authService.getAccessToken();
        return this.http.get<BookResponse[]>(`http://localhost:3000/get_books?storeId=${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    getBook(id: number, storeId: number){
        const token = this.authService.getAccessToken();
        return this.http.get<BookResponse>(`http://localhost:3000/get_book/${id}?storeId=${storeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
   
    createBook(book: CreateBook, storeId: number){
        const token = this.authService.getAccessToken();
        return this.http.post<Book>('http://localhost:3000/create_book',{ ...book,storeId: storeId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    deleteBook(id: number, storeId: number) {
        const token = this.authService.getAccessToken();
        return this.http.delete(`http://localhost:3000/delete_book/${id}?storeId=${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, 
            
        );
    }

    updateBook(id: number, book: Omit<CreateBook, 'id'>, storeId: number){
        const token = this.authService.getAccessToken();
        return this.http.put(`http://localhost:3000/update_book/${id}?storeId=${storeId}`,book,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, );
    }
}