const express = require('express');
const route = express.Router();

route.use('/products', require('./products.route'))

module.exports = route;