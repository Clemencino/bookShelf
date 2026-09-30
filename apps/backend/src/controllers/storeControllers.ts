import express, { type Express, type Request, type Response} from 'express';
import * as storeService from '../services/storeService'
import { Store }from '@org/storelib'

const app: Express = express();

export async function getAllStores(req: Request, res: Response):Promise<Response<Store[]>>{
    const stores = await storeService.getStores();
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
    console.log(req.body);
    const newStore = await storeService.addStore(req.body);

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
