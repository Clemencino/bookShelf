import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserCreated, UserToLog } from '@org/userlib'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}
    getUsers(){
        return this.http.get<UserCreated[]>('http://localhost:3000/get_users');
    }

    getUser(id: number){
        return this.http.get<UserCreated>(`http://localhost:3000/get_user/${id}`);
    }
    
    createUser(book: Omit<UserCreated,'id'>){
        return this.http.post<UserCreated>('http://localhost:3000/create_user', book);
    }
    
    deleteUser(id: number){
        return this.http.delete(`http://localhost:3000/delete_user/${id}`);
    }

    updateUser(id: number, book: Omit<UserCreated, 'id'>){
        return this.http.put(`http://localhost:3000/update_user/${id}`, book);
    }
}