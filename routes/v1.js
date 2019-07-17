const express = require('express')
const router = express.Router()

const PlayerController = require('../controllers/playersController')
const ValidatorMiddleware = require('../middleware/validatorMiddleware')
const PlayerSchema = ValidatorMiddleware.Schema

/* CREATE */
router.post('/players', ValidatorMiddleware.validate(PlayerSchema.create), PlayerController.createPlayer) 

/* UPDATE */
router.put('/players/:uuid', PlayerController.updatePlayer) 

/* DELETE */
router.delete('/players/:uuid', PlayerController.deletePlayer) 

/* GET ALL */
router.get('/players', PlayerController.getAllPlayer) 

/* GET ONE */
router.get('/players/:uuid', PlayerController.getOnePlayer)

module.exports = router;