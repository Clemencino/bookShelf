import express, { type Express, type Request, type Response } from 'express'
import { router as booksRouter } from './routes/booksRoutes'
import { router as usersRouter } from './routes/userRoutes'
import { router as storesRouter } from './routes/storeRoutes'
import cors from 'cors';
export const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(express.json());

app.use('/', booksRouter);
app.use('/', usersRouter);
app.use('/', storesRouter);

//app.listen(3000);




/*
GET /books 
GET /books/:id

DELETE /books/:id
POST /books/
*/
