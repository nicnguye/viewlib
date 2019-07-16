const express = require("express");
const bodyParser = require("body-parser")
const faker = require("faker");
const db = require("./models");
const v1 = require("./routes/v1")
const http = require("http")

const logger = require("morgan")

const app = express();
app.use(logger('dev'))
app.use(v1)
app.use(bodyParser.json())

app.get('*', (req, res) => res.status(200).send({message: 'nothing to see'}))

const server = http.createServer(app)
const port = parseInt(process.env.PORT, 10)|| 3307
server.listen(3307, () => console.log(`Server listening on port ${port}`))

module.exports = app