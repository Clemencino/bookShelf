import type { UserToLog, UserCreated } from '@org/userlib';
import { pool } from '../db/postgres';

export async function getUsers(): Promise<UserCreated[]> {
    const request = await pool.query('SELECT * from users');
    const users = [];
    for (const user of request.rows) {
        users.push(user);
    }
    return users;
};


export async function getUser(id: number): Promise<UserCreated | null>{
    const res = await pool.query('SELECT * FROM users where id=$1', [id]);
    if (res.rows.length === 0){
        return null;
    }
    return res.rows[0];
}

export async function deleteUser(id: number): Promise<boolean> {
    const res = await pool.query('DELETE FROM users where id=$1', [id]);
    if (res.rowCount === 1){
        return true;
    }
    return false;
}

//@TODO Hash password
export async function addUser(toadd: Omit<UserCreated,'id'>): Promise<UserCreated>{
    const res = await pool.query(`INSERT INTO users (first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4) RETURNING *`,[toadd.first_name, toadd.last_name, toadd.email, toadd.password]);
        console.log(res.rows[0]);
    return res.rows[0];
}

export async function updateUser(id: number,newFirstName: string,newLastName: string, newEmail: string, newPassword: string):Promise<UserCreated | null> {

    const res = await pool.query(`UPDATE users SET id=$1, first_name=$2, last_name=$3, email=$4, password=$5 
        WHERE id = $1 RETURNING *`,[id,newFirstName,newLastName, newEmail, newPassword ]);
    if (res.rows.length === 0) {
        return null;
    }

    return res.rows[0];
}