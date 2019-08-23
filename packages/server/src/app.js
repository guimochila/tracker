import express from 'express';
import helmet from 'helmet';
import { signup, signin, isAuthenticated } from './utils/auth';
import trackRoutes from './resources/track/track.routes';
import {
  notFound,
  developmentErrors,
  productionErrors,
} from './handlers/errorHandler';

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
// Routes
app.use('/api/tracks', trackRoutes);

// In case there is not route found we set the status to 404 and forward to an error handler;
app.use(notFound);

// Development error handler, it shows the stack error in development mode.
if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

// Production error handler
app.use(productionErrors);

export default app;
