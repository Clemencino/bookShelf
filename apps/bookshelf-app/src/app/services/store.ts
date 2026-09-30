import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@org/storelib'

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private http: HttpClient) {}
    
    getStores(){
        return this.http.get<Store[]>("http://localhost:3000/get_stores");
    }

    getStore(id: number) {
        return this.http.get<Store>(`http://localhost:3000/get_store/${id}`);
    }

    createStore(store: Omit<Store, 'id'>) {
        return this.http.post("http://localhost:3000/create_store", store);
    } 

    updateStore(id: number, store: Omit<Store, 'id'>) {
        return this.http.put(`http://localhost:3000/update_store/${id}`, store);
    }

    deleteStore(id: number) {
        return this.http.delete(`http://localhost:3000/delete_store/${id}`);
    }
    
}