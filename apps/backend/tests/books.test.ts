import request from 'supertest'
import { app } from '../src/app'
import { Book, CreateBook } from '@org/booklib'
import { QueryResult } from 'pg';
import { describe, expect, it, jest, afterEach } from '@jest/globals';
import { pool } from '../src/db/postgres';

afterEach(() => {
    jest.restoreAllMocks();
});


const mockQuery = jest.spyOn(pool, 'query');
describe('Books API', () => {
    describe('POST /create_book', () => {
        it('should return a book', async () => {

            const book1: Book = { id: 1,name: 'Book1',description: 'BlaBlaBla',url_image: 'assets/bookCover1.png',store_id: 1};

            const createBook1: CreateBook = {name: 'Book1',description: 'BlaBlaBla', urlImage: 'assets/bookCover1.png'};

            mockQuery.mockImplementation(async () => {
                return{
                    rows:[book1],
                    rowCount: 1
                }as any;
            });

            const response = await request(app).post('/create_book').send(createBook1);
            expect(response.status).toBe(201);

            expect(response.body).toEqual({
                id: 1,
                name: 'Book1',
                description: 'BlaBlaBla',
                urlImage: 'assets/bookCover1.png',
                storeId: 1
            });
        });
    });
});

        /*
        it('GET /get_books', async () => {
            const mock : Book[]= [
                {"id":1,"name":"Book1","description":"BlaBlaBla","url_image":"assets/bookCover1.png", "store_id":1},
                {"id":2,"name":"Book2","description":"zzzZZZZ","url_image":"assets/bookCover1.png", "store_id" :1}
            ];
            const response = await request(app).get('/get_books');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toEqual(mock);
        });

        it('DELETE /delete_book/1', async () =>{
            const response = await request(app).delete('/delete_book/1');
            expect(response.status).toBe(204);
            expect(Array.isArray(response.body)).toBe(false);


            const response2 = await request(app).delete('/delete_book/2');
            expect(response2.status).toBe(204);
            expect(Array.isArray(response2.body)).toBe(false);



            const response3 = await request(app).delete('/delete_book/1');
            expect(response3.status).toBe(404);
            expect(Array.isArray(response3.body)).toBe(true);
        })*/
