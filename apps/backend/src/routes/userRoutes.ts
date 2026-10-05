import express from 'express';
import * as userController from '../controllers/userControllers'
import { authentification } from '../middleware/authentification';

export const router = express.Router();

router.get('/get_users', authentification, userController.getAllUsers);

router.get('/get_user/:id', authentification, userController.getUser);

router.delete('/delete_user/:id', authentification, userController.deleteUser);

router.post('/create_user', userController.addUser);

router.put('/update_user/:id', authentification, userController.updateUser);

router.post('/post_user_login/', userController.checkUser);

router.post('/refresh',userController.refreshToken);

router.post('/logout', userController.logout);