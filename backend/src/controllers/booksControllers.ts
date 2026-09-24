import express, { type Express, type Request, type Response} from 'express';
import * as bookService from '../services/bookServices.ts'
import type { Book } from '../data.ts'

const app: Express = express();

export function getAllBooks(req: Request, res: Response){
    return res.json(bookService.getAllBooks());
}

export function getBook(req:Request, res:Response) {
    const book: Book = bookService.getBook(Number(req.params.id));
    if (book === null) {
        return res.status(404).json({message: "Book not found"});
    }
    return res.json(book);
}

export function deleteBook(req: Request, res: Response) {
    if (bookService.deleteBook(Number(req.params.id))){
        return res.status(204).send();
    }
    res.status(404).json({ message: "book not found" });
}

export function addBook(req: Request, res: Response) {
    const newBook = bookService.addBook(req.body);
    return res.status(201).json(newBook);
}


