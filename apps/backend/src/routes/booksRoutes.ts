import express from 'express';
import * as bookController from '../controllers/booksControllers'
import { authentification } from '../middleware/authentification';

export const router = express.Router();

router.get('/get_books', authentification, bookController.getAllBooks);

router.get('/get_book/:id', authentification, bookController.getBook);

router.delete('/delete_book/:id', authentification, bookController.deleteBook);

router.post('/create_book', authentification,bookController.addBook);

router.put('/update_book/:id', authentification, bookController.updateBook);