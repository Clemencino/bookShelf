import express, { type Express, type Request, type Response, type NextFunction, Router } from 'express';
import * as bookController from '../controllers/booksControllers.ts'

export const router = express.Router();

router.get('/get_books', bookController.getAllBooks);

router.get('/get_book/:id', bookController.getBook);

router.delete('/delete_book/:id', bookController.deleteBook);

router.post('/create_book', bookController.addBook);

router.put('/update_book/:id', bookController.updateBook);