import express from 'express';
const route = express.Router();

import republish from '../controllers/republish.controller';

route.get('/republish', republish);

export default route;