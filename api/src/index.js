import express from 'express';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(express.json());

app.listen(3000, () => {
  console.log(` > API: ${3000}`);
});