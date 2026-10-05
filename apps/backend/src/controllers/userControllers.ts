import express, { type Express, type Request, type Response} from 'express';
import * as userService from '../services/userServices'
import { UserCreated, UserToLog } from '@org/userlib'
import jwt from 'jsonwebtoken';

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

export async function checkUser(req: Request, res: Response){
    const email = req.body.email;
    const password = req.body.password;
    const canLogged = await userService.checkUser(email, password);
    if (!canLogged){
        return res.status(401).json({ message: 'user or password incorrect'});
    }

    const token = jwt.sign(
        { sub: String(canLogged.id)},
        process.env['JWT_SECRET']!,
        { expiresIn: '2h'}
    );

    const refreshToken = jwt.sign(
        { sub: String(canLogged.id)},
        process.env['JWT_SECRET']!,
        { expiresIn: '2d' }
    );
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 172800000 // 2 days
    });
    return res.json({
        name: canLogged.first_name,
        token: token
    });
}

export async function refreshToken(req: Request, res: Response) {

    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        return res.status(401).json({message: 'Refresh token is missing' });
    }

    try {
        const refreshTokenVerified = jwt.verify(refreshToken, process.env['JWT_SECRET']!);
        const accessToken = jwt.sign( { sub: String(refreshTokenVerified.sub) }, process.env['JWT_SECRET']!,{ expiresIn: '2h' });
        const user = await userService.getUser(Number(refreshTokenVerified.sub));

        if (user === null){
            return res.status(401).json({ message: 'User not found' });
        }

        return res.json({ token: accessToken, name: user.first_name});

    }catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
}
export function logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    return res.json({ message: 'User is logged out' });
}