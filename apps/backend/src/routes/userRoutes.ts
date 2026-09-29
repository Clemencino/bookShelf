import express from 'express';
import * as userController from '../controllers/userControllers'

export const router = express.Router();

router.get('/get_books', userController.getAllUsers);

router.get('/get_book/:id', userController.getUser);

router.delete('/delete_book/:id', userController.deleteUser);

router.post('/create_book', userController.addUser);

router.put('/update_book/:id', userController.updateUser);

/*
GET /get_users
GET /get_user/:id

POST /create_user

DELETE /delete_uset/:id

UPDATE /update_user/:id

*/