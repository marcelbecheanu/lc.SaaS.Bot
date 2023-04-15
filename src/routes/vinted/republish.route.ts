import express from 'express';
const route = express.Router();

import republish from '../../controllers/vinted/republish.controller';

route.get('/republish', republish);

export default route;