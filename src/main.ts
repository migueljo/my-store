import express from 'express';
import bodyParser from 'body-parser';

import { routerApi } from './api.js';
import errorHandler from './middleware/error-handler.middleware.js';

const app = express();
const port = 3005;

app.use(bodyParser.json());
routerApi(app);
app.use(errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));
