import express from 'express';
import helmet from 'helmet';
import { signup, signin, isAuthenticated } from './utils/auth';
import trackRoutes from './resources/track/track.routes';

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

app.use('/api/tracks', trackRoutes);

export default app;
