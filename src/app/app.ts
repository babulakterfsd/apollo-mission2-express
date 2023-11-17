import express, { Request, Response } from 'express';

const app = express();
export const port = process.env.PORT || 5000;

//parsers
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Its a GET request');
});

app.post('/', (req: Request, res: Response) => {
  const data = req.body;
  res.json(data);
});

export default app;
