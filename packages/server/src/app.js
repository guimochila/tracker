import express from 'express';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hi there');
});

export default app;
