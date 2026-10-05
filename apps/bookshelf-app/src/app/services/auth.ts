import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    
    private http = inject(HttpClient);
    private accessToken ='';
    userName = signal('');
    getAccessToken(): string {
        return this.accessToken;
    }
    setAccessToken(token: string){
        this.accessToken = token;
    }
    clearAccessToken() {
        this.accessToken = '';
        this.userName.set('');
    }
    refreshToken() {
        return this.http.post(
            'http://localhost:3000/refresh',
            {},
            {
                withCredentials: true
            }
        );
    }
    logout() {
        this.clearAccessToken();

        return this.http.post(
            'http://localhost:3000/logout',
            {},
            { withCredentials: true }
        );
    }
}