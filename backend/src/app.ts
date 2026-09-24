import express, { type Express, type Request, type Response } from 'express';
import { router } from './routes/booksRoutes.ts';
import cors from 'cors';
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(express.json());

app.use('/', router);
app.listen(3000);




/*
GET /books 
GET /books/:id

DELETE /books/:id
POST /books/
*/
