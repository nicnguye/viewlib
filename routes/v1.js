const express = require('express')
const router = express.Router()

const PlayerController = require('../controllers/playersController')
const ValidatorMiddleware = require('../middleware/validatorMiddleware')
const PlayerSchema = ValidatorMiddleware.Schema

/* CREATE */
router.post('/players', ValidatorMiddleware.validateBody(PlayerSchema.create), PlayerController.createPlayer) 

/* UPDATE */
router.put('/players/:uuid', 
ValidatorMiddleware.validateParams(PlayerSchema.updateParams),
ValidatorMiddleware.validateBody(PlayerSchema.updateBody),
PlayerController.updatePlayer) 

/* DELETE */
router.delete('/players/:uuid', ValidatorMiddleware.validateParams(PlayerSchema.delete), PlayerController.deletePlayer) 

/* GET ALL */
router.get('/players', PlayerController.getAllPlayer) 

/* GET ONE */
router.get('/players/:uuid', ValidatorMiddleware.validateParams(PlayerSchema.getOne),PlayerController.getOnePlayer)

module.exports = router;