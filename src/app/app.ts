import express, { NextFunction, Request, Response } from 'express';

const app = express();
export const port = process.env.PORT || 5000;

//parsers
app.use(express.json());

//logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Ami logger middleware`);
  next();
};
const logger2 = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Ami logger er porer middleware`);
  next();
};

//normal get request or a get request with query param
app.get('/', logger, logger2, (req: Request, res: Response) => {
  //joto iccha middleware use korte paro
  if (req?.query?.email) {
    res.send(`Its a GET request from a user whose email is ${req.query.email}`);
  } else {
    res.send('Its a GET request');
  }
});

//get request with params
app.get('/:userId', logger, (req: Request, res: Response) => {
  //logger middleware ta ekhane use korechi. prottekta request ei middleware diye jaabe
  res.send(`Its a GET request with params ${req.params.userId}`);
});
app.get('/:userId/:userSerial', (req: Request, res: Response) => {
  //userId ebong userSerial naam diye ami ekhane recieve korechi
  res.send(
    `Its a GET request with params ${req.params.userId} and user serial is ${req.params.userSerial}`
  );
});

//normal post request
app.post('/', (req: Request, res: Response) => {
  const data = req.body;
  res.json(data);
});

export default app;
