const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

const port = process.env.PORT || 8080;
const router = require('./app/routes/api');

app.use('/api', router);

app.listen(port, () => {
  console.log('Server listening on port %d', port);
});
