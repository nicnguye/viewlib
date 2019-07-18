const express = require('express')
const router = express.Router()

const PlayerController = require('../controllers/playersController')
const UserController = require('../controllers/usersController')
const ValidatorMiddleware = require('../middleware/validatorMiddleware')
const Schema = ValidatorMiddleware.Schema

/* CREATE */
router.post('/players', ValidatorMiddleware.validateBody(Schema.create), PlayerController.createPlayer) 

/* UPDATE */
router.put('/players/:uuid', 
ValidatorMiddleware.validateParams(Schema.updateParams),
ValidatorMiddleware.validateBody(Schema.updateBody),
PlayerController.updatePlayer) 

/* DELETE */
router.delete('/players/:uuid', ValidatorMiddleware.validateParams(Schema.delete), PlayerController.deletePlayer) 

/* GET ALL */
router.get('/players', PlayerController.getAllPlayer) 

/* GET ONE */
router.get('/players/:uuid', ValidatorMiddleware.validateParams(Schema.getOne), PlayerController.getOnePlayer)

/* LOGIN */
router.post('/login', ValidatorMiddleware.validateBody(Schema.login), UserController.login)

/* REGISTER */
router.post('/register', ValidatorMiddleware.validateBody(Schema.register), UserController.register)

module.exports = router;