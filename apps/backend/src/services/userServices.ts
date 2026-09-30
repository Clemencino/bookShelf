import type { UserToLog, UserCreated } from '@org/userlib';
import { pool } from '../db/postgres';
import { hash, compare } from 'bcrypt-ts';
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

export async function addUser(toadd: Omit<UserCreated,'id'>): Promise<UserCreated>{
    const hashPassword = await hash(toadd.password, 10);
    const res = await pool.query(`INSERT INTO users (first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4) RETURNING *`,[toadd.first_name, toadd.last_name, toadd.email, hashPassword]);
        console.log(res.rows[0]);
    return res.rows[0];
}

export async function updateUser(id: number,newFirstName: string,newLastName: string, newEmail: string, newPassword: string):Promise<UserCreated | null> {

    const passwordHash = await hash(newPassword, 10);
    const res = await pool.query(`UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4 
        WHERE id = $5 RETURNING *`,[newFirstName,newLastName, newEmail, passwordHash, id ]);
    if (res.rows.length === 0) {
        return null;
    }

    return res.rows[0];
}

export async function checkUser(email: string, password: string):Promise<UserCreated | null> {
    const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (res.rows.length === 0) {
        return null;
    }
    const isGoodPassword = await compare(password, res.rows[0].password);
    console.log(isGoodPassword);
    if (!isGoodPassword) {
        return null;
    }
    return res.rows[0];
}