console.clear();

const express = require('express');
const compression = require('compression');

const settings = require('./configs/settings.json');
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/vinted', require('./routes/vinted/index.route.js'));

app.listen(settings.express.port || 9000, () => {
  console.log(` > API PORT: ${settings.express.port || 9000}`);
});