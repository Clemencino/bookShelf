import express, { type Express, type Request, type Response} from 'express';
import * as bookService from '../services/bookServices'
import { BookResponse } from '@org/booklib'

const app: Express = express();

export async function getAllBooks(req: Request, res: Response):Promise<Response<BookResponse[]>>{
    const books = await bookService.getAllBooks();
    return res.json(books);
}

export async function getBook(req:Request, res:Response): Promise<Response<BookResponse>> {
    const book = await bookService.getBook(Number(req.params['id']));
    if (book === null) {
        return res.status(404).json({message: "Book not found"});
    }
    return res.json(book);
}

export async function deleteBook(req: Request, res: Response): Promise<Response<BookResponse>> {
    if (await bookService.deleteBook(Number(req.params['id']))){
        return res.status(204).send();
    }
    return res.status(404).json({ message: "book not found" });
}

export async function addBook(req: Request, res: Response): Promise<Response<BookResponse>> {
    console.log(req.body);

    const newBook = await bookService.addBook(req.body);

    return res.status(201).json(newBook);
}

export async function updateBook(req: Request, res: Response) :Promise<Response<BookResponse>>{
    const id = Number(req.params['id']);
    const newBook = await bookService.updateBook(id,req.body.name,req.body.description,req.body.urlImage);
    if (newBook === null) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.json(newBook);
}
