import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserCreated, UserToLog } from '@org/userlib'
import { AuthService } from './auth';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    authService = inject(AuthService); 
    constructor(private http: HttpClient) {}
    getUsers(){
        const token = this.authService.getAccessToken();

        return this.http.get<UserCreated[]>('http://localhost:3000/get_users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }

    getUser(id: number){
        const token = this.authService.getAccessToken();
        return this.http.get<UserCreated>(`http://localhost:3000/get_user/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    createUser(user: Omit<UserCreated,'id'>){
        const token = this.authService.getAccessToken();
        return this.http.post<UserCreated>('http://localhost:3000/create_user', user,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    deleteUser(id: number){
        const token = this.authService.getAccessToken();
        return this.http.delete(`http://localhost:3000/delete_user/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    updateUser(id: number, user: Omit<UserCreated, 'id'>){
        const token = this.authService.getAccessToken();
        return this.http.put(`http://localhost:3000/update_user/${id}`, user,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    checkLoginUser(user: UserToLog){
        return this.http.post(`http://localhost:3000/post_user_login/`, user, {withCredentials: true});
    }
    refreshToken() {
    return this.http.post<{ token: string }>('http://localhost:3000/refresh',{}, { withCredentials: true });
}
}