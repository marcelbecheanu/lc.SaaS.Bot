const express = require('express');
const route = express.Router();

const { republish } = require('../../controllers/vinted/republish.controller.js');

route.post('/republish', republish);

route.get('/status', (req, res) => {
    res.send("hello")
})

module.exports = route;