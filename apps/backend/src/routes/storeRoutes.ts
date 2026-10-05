import express from 'express';
import * as storeController from '../controllers/storeControllers'
import { authentification } from '../middleware/authentification';

export const router = express.Router();

router.get('/get_stores', authentification, storeController.getAllStores);

router.get('/get_store/:id', authentification, storeController.getStore);

router.delete('/delete_store/:id', authentification, storeController.deleteStore);

router.post('/create_store', authentification, storeController.addStore);

router.put('/update_store/:id', authentification, storeController.updateStore);