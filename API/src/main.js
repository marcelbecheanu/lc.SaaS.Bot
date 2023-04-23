const express = require('express');
const compression = require('compression');
const cors = require('cors');

const settings = require('./config/app.json');

const app = express();
const { port, domain } = settings.server;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({
    origin: '*'
}));

global.proxies = [];

app.use('/v1', require('./route/user.route'));
app.use('/proxies', (req, res) => res.status(200).json({ num: global.proxies.length, proxies: global.proxies }))


app.listen(port || 9000, () => console.log(`Server running on http://${domain}:${port}.`));