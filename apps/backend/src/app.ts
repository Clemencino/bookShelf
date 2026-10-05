import express, { type Express, type Request, type Response } from 'express'
import { router as booksRouter } from './routes/booksRoutes'
import { router as usersRouter } from './routes/userRoutes'
import { router as storesRouter } from './routes/storeRoutes'
import cors from 'cors';
import cookieParser from 'cookie-parser';
export const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/', booksRouter);
app.use('/', usersRouter);
app.use('/', storesRouter);

