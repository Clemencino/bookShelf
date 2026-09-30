import { Store, StoreToCreate} from '@org/storelib'
import { pool } from '../db/postgres';

export async function getStores(): Promise<Store[]> {
    const request = await pool.query('SELECT * from stores');
    const stores = [];
    for (const store of request.rows) {
        stores.push(store);
    }
    return stores;
};


export async function getStore(id: number): Promise<Store | null>{
    const res = await pool.query('SELECT * FROM stores where id=$1', [id]);
    if (res.rows.length === 0){
        return null;
    }
    return res.rows[0];
}

export async function deleteStore(id: number): Promise<boolean> {
    const res = await pool.query('DELETE FROM stores where id=$1', [id]);
    if (res.rowCount === 1){
        return true;
    }
    return false;
}

export async function addStore(toadd: Omit<Store,'id'>): Promise<Store>{
    const res = await pool.query(`INSERT INTO stores (name, description) 
        VALUES ($1, $2) RETURNING *`,[toadd.name, toadd.description]);
        console.log(res.rows[0]);
    return res.rows[0];
}

export async function updateStore(id: number,newName: string, newDescription: string):Promise<Store| null> {

    const res = await pool.query(`UPDATE stores SET name=$1, description=$2
        WHERE id = $3 RETURNING *`,[newName, newDescription, id ]);
    if (res.rows.length === 0) {
        return null;
    }

    return res.rows[0];
}