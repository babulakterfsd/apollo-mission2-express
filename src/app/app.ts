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

//routes
const testRouter = express.Router();
app.use('/api/v1/test', testRouter);

testRouter.get('/createtest', (req: Request, res: Response) => {
  res.json({
    message: 'Test created',
  });
});

//normal get request or a get request with query param
app.get(
  '/',
  logger,
  logger2,
  (req: Request, res: Response, next: NextFunction) => {
    //joto iccha middleware use korte paro
    try {
      throw new Error('Error from get request'); // testing global error handler
      if (req?.query?.email) {
        res.send(
          `Its a GET request from a user whose email is ${req.query.email}`
        );
      } else {
        res.send('Its a GET request');
      }
    } catch (error) {
      next(error);
    }
  }
);

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

//handling 404 error
// app.all('*', (req: Request, res: Response) => {
//   res.status(404).json({
//     message: 'Route not found',
//   });
// });

//error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: `${err.message}. This error is handled by global error handler.`,
  });
});

export default app;
