import express from 'express';
import * as userController from '../controllers/userControllers'

export const router = express.Router();

router.get('/get_users', userController.getAllUsers);

router.get('/get_user/:id', userController.getUser);

router.delete('/delete_user/:id', userController.deleteUser);

router.post('/create_user', userController.addUser);

router.put('/update_user/:id', userController.updateUser);

router.post('/post_user_login/', userController.checkUser);
