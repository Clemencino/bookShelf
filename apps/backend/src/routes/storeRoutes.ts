import express from 'express';
import * as storeController from '../controllers/storeControllers'

export const router = express.Router();

router.get('/get_stores', storeController.getAllStores);

router.get('/get_store/:id', storeController.getStore);

router.delete('/delete_store/:id', storeController.deleteStore);

router.post('/create_store', storeController.addStore);

router.put('/update_store/:id', storeController.updateStore);