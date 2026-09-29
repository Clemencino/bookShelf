import express, { type Express, type Request, type Response} from 'express';
import * as userService from '../services/userServices'
import { UserCreated, UserToLog } from '@org/userlib'

const app: Express = express();

export async function getAllUsers(req: Request, res: Response):Promise<Response<UserCreated[]>>{
    const users = await userService.getUsers();
    return res.json(users);
}

export async function getUser(req:Request, res:Response): Promise<Response<UserCreated>> {
    const user = await userService.getUser(Number(req.params['id']));
    if (user === null) {
        return res.status(404).json({message: "User not found"});
    }
    return res.json(user);
}

export async function deleteUser(req: Request, res: Response): Promise<Response<UserCreated>> {
    if (await userService.deleteUser(Number(req.params['id']))){
        return res.status(204).send();
    }
    return res.status(404).json({ message: "User not found" });
}

export async function addUser(req: Request, res: Response): Promise<Response<UserCreated>> {
    console.log(req.body);

    const newUser = await userService.addUser(req.body);

    return res.status(201).json(newUser);
}

export async function updateUser(req: Request, res: Response) :Promise<Response<UserCreated>>{
    const id = Number(req.params['id']);
    const newUser = await userService.updateUser(id,req.body.first_name,req.body.last_name,req.body.email, req.body.password);
    if (newUser === null) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(newUser);
}

export async function checkUser(req: Request, res: Response) : Promise<Response<UserCreated>> {
    const email = req.body.email;
    const password = req.body.password;
    const canLogged = await userService.checkUser(email, password);
    if (canLogged === null) {
        return res.status(401).json({message : "User or password incorrect"})
    }
    return res.json(canLogged);
}