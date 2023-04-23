import express from 'express';
const route = express.Router();

import { getVintedUserData } from '../controllers/user.controller';
route.get('/user', getVintedUserData);

export default route;