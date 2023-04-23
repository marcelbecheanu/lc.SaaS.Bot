const express = require('express');
const route = express.Router();

const { getUser } = require('../controller/user.controller');

route.get("/user", getUser);

module.exports = route;