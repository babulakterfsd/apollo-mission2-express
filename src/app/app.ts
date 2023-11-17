import express from 'express';

const app = express();
export const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello Full stack dev Babul');
});

export default app;
