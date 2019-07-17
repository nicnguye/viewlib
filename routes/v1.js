const express = require('express')
const router = express.Router()

const PlayerController = require('../controllers/playersController')

/* CREATE */
router.post('/players', function(req, res, next){
  PlayerController.createPlayer(req, res).then((result) => res.json(result))
}) 

/* UPDATE */
router.put('/players/:id', function(req, res, next){
  PlayerController.updatePlayer(req, res).then((result) => res.json(result))
}) 

/* DELETE */
router.delete('/players/:id', function(req, res, next){
  PlayerController.deletePlayer(req, res).then((result) => res.json(result))
}) 

/* GET ALL */
router.get('/players', PlayerController.getAllPlayer) 

/* GET ONE */
router.get('/players/:id', function(req, res, next){
  PlayerController.getOnePlayer(req, res).then((result) => res.json(result))
})
module.exports = router;