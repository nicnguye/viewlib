const express = require('express')
const router = express.Router()
const passport = require('passport')

const PlayerController = require('../controllers/playersController')
const UserController = require('../controllers/usersController')
const ValidatorMiddleware = require('../middleware/validatorMiddleware')
const Schema = ValidatorMiddleware.Schema

/* CREATE */
router.post('/players', 
passport.authenticate('jwt', {session:false}), 
ValidatorMiddleware.validateBody(Schema.create), 
PlayerController.createPlayer) 

/* UPDATE */
router.put('/players/:uuid', 
passport.authenticate('jwt', {session:false}), 
ValidatorMiddleware.validateParams(Schema.updateParams),
ValidatorMiddleware.validateBody(Schema.updateBody),
PlayerController.updatePlayer) 

/* DELETE */
router.delete('/players/:uuid', 
passport.authenticate('jwt', {session:false}), 
ValidatorMiddleware.validateParams(Schema.delete), 
PlayerController.deletePlayer) 

/* GET ALL */
router.get('/players', 
passport.authenticate('jwt', {session:false}), 
PlayerController.getAllPlayer) 

/* GET ONE */
router.get('/players/:uuid', 
passport.authenticate('jwt', {session:false}), 
ValidatorMiddleware.validateParams(Schema.getOne), 
PlayerController.getOnePlayer)

/* LOGIN */
router.post('/login', 
ValidatorMiddleware.validateBody(Schema.login), 
UserController.login)

/* REGISTER */
router.post('/register', 
ValidatorMiddleware.validateBody(Schema.register), 
UserController.register)

module.exports = router;