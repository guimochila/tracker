import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import {
  notFound,
  developmentErrors,
  productionErrors,
} from './handlers/errorHandler';
import grapqhQLServer from './createServer';
import { isAuthenticated } from './utils/auth';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(isAuthenticated);

/* Start the GraphQL server express */
grapqhQLServer().applyMiddleware({ app });

// In case there is not route found we set the status to 404 and forward to an error handler;
app.use(notFound);

// Development error handler, it shows the stack error in development mode.
if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

// Production error handler
app.use(productionErrors);

export default app;
