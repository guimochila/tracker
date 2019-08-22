import express from 'express';
import helmet from 'helmet';
import { signup, signin, isAuthenticated } from './utils/auth';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/signup', signup);
app.post('/signin', signin);

// Apply isAuthenticated middleware
app.use(isAuthenticated);

app.get('/', (req, res) => {
  res.send('You are authenticated ' + req.user.email);
});

export default app;
