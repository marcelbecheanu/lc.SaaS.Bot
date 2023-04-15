import express from 'express';
const route = express.Router();

import republish from './republish.route';
route.use('/products', republish);

export default route;