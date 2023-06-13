import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { routerApi } from './api.js';
import errorHandler from './middleware/error-handler.middleware.js';

const app = express();
const port = process.env.PORT || 3005;
const allowedOrigins = ['http://localhost:8080'];

app.use(cors({ origin: allowedOrigins }));
app.use(morgan('combined'));
app.use(bodyParser.json());
routerApi(app);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * TODO: Deploy to another cloud: Heroku or Google Cloud Platform
 * - https://railway.app/
 */
