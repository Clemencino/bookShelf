import express, { type Express, type Request, type Response} from 'express';
import * as storeService from '../services/storeService'
import { Store }from '@org/storelib'

const app: Express = express();

export async function getAllStores(req: Request, res: Response):Promise<Response<Store[]>>{
    const userId = res.locals['userId'];
    const stores = await storeService.getStores(userId);
    return res.json(stores);
}

export async function getStore(req:Request, res:Response): Promise<Response<Store>> {
    const store = await storeService.getStore(Number(req.params['id']));
    if (store === null) {
        return res.status(404).json({message: "Store not found"});
    }
    return res.json(store);
}

export async function deleteStore(req: Request, res: Response): Promise<Response<Store>> {
    if (await storeService.deleteStore(Number(req.params['id']))){
        return res.status(204).send();
    }
    return res.status(404).json({ message: "Store not found" });
}

export async function addStore(req: Request, res: Response): Promise<Response<Store>> {
    const userId = res.locals['userId'];
    const newStore = await storeService.addStore(req.body,userId);

    return res.status(201).json(newStore);
}

export async function updateStore(req: Request, res: Response) :Promise<Response<Store>>{
    const id = Number(req.params['id']);
    const newStore = await storeService.updateStore(id,req.body.name,req.body.description);
    if (newStore === null) {
        return res.status(404).json({ message: "Store not found" });
    }
    return res.json(newStore);
}

export async function addStoreUser(req: Request,res: Response): Promise<Response> {
    const userId = res.locals['userId'];
    const storeId = Number(req.body.storeId);
    await storeService.addStoreUser(userId, storeId);
    return res.status(201).json();
}