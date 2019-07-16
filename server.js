const express = require("express");
const bodyParser = require("body-parser")
const faker = require("faker");
const db = require("./models");

const logger = require("morgan")

const app = express();
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('*', (req, res) => res.status(200).send({message: 'nothing to see'}))

app.listen(8080, () => console.log("App listening on port 8080"))