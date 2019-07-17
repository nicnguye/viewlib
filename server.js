const express = require("express");
const bodyParser = require("body-parser")
const faker = require("faker");
const db = require("./models");
const v1 = require("./routes/v1")
const http = require("http")

const logger = require("morgan")

/* Sequelize initialization */
const CONFIG = require('./config/config.json')
const models = require('./models')
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', CONFIG.development.database)
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.development.database, err)
  })

/* Express initializiation */
const app = express();
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/v1', v1)

app.get('/', (req, res) => res.status(200).send('Nothing to see here :('))
app.use((req, res, next) => {
  res.status(404).send('Not Found !')
})

const server = http.createServer(app)
const port = parseInt(process.env.PORT, 10)|| 3307
server.listen(3307, () => console.log(`Server listening on port ${port}`))

module.exports = app