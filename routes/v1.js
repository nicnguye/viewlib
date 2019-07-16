const express = require('express')
const router = express.Router()

const PlayerController = require('../controllers/playersController')

/* CREATE */
router.post('/players', function(req, res, next){

}) 

/* UPDATE */
router.put('/players/:id', function(req, res, next){
  
}) 

/* DELETE */
router.delete('/players/:id', function(req, res, next){
  
}) 

/* GET ALL */
router.get('/players', function(req, res, next){
  PlayerController.getAll().then((result) => res.json(result))
}) 

/* GET ONE */
router.get('/players/:id', function(req, res, next){
})
module.exports = router;