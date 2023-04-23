console.clear();
import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';

import settings from './configs/settings.json';

const app = express();
const { port, domain } = settings.server;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
app.use(cors({
    origin: '*'
}));
  

import UserRoute from './routes/user.route';
app.use('/v1/vinted/', UserRoute);

app.listen(port || 9000, () => console.log(`Server running on http://${domain}:${port}.`));