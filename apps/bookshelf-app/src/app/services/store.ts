import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@org/storelib'
import { AuthService } from './auth';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private http: HttpClient) {}
    authService = inject(AuthService);
    getStores(){
        const token = this.authService.getAccessToken();
        return this.http.get<Store[]>("http://localhost:3000/get_stores",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
    }

    getStore(id: number) {
        return this.http.get<Store>(`http://localhost:3000/get_store/${id}`);
    }

    createStore(store: Omit<Store, 'id'>) {
        const token = this.authService.getAccessToken();
            console.log('TOKEN CREATE STORE :', token);
        return this.http.post('http://localhost:3000/create_store',store,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } 

    updateStore(id: number, store: Omit<Store, 'id'>) {
        return this.http.put(`http://localhost:3000/update_store/${id}`, store);
    }

    deleteStore(id: number) {
        return this.http.delete(`http://localhost:3000/delete_store/${id}`);
    }

    addStoreUser(storeId: number) {
        const token = this.authService.getAccessToken();
        return this.http.post('http://localhost:3000/add_store_to_user',{storeId: storeId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}