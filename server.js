const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const passport = require('passport');

/* API request log */
const logger = require('morgan');
const v1 = require('./routes/v1');

/* SEQUELIZE initialization */
const CONFIG = require('./config/config.json');
const models = require('./models');

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', CONFIG.development.database);
  })
  .catch((err) => {
    console.error('Unable to connect to SQL database:', CONFIG.development.database, err);
  });

/* EXPRESS initialization */
const app = express();
app.use(logger('dev'));

/* CORS Middleware */
app.use(cors());

/* BODY PARSER Middleware */
app.use(bodyParser.json());

/* ROUTES */
app.use('/v1', v1);

/* Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

/* Index & 404 Route */
app.get('/', (req, res) => res.status(200).send('Nothing to see here :('));
app.use((req, res) => {
  res.status(404).send('Error 404: Not Found !');
});

const server = http.createServer(app);
const port = parseInt(process.env.PORT, 10) || 3307;
server.listen(3307, () => console.log(`Server listening on port ${port}`));

module.exports = app;
