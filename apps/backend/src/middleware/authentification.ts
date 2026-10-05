import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authentification(req: Request, res: Response, next: NextFunction) : Response | void{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token is missing" });
    }

    const parts = authHeader.split(' ');

    if (parts[0] !== 'Bearer') {
        return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = parts[1];

    try {
        const tokenVerified = jwt.verify( token, process.env['JWT_SECRET']!);
        res.locals['userId'] = Number(tokenVerified.sub);
        next();

    }catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}