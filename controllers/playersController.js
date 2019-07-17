const { Player } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/* CREATE */
const createPlayer = async function(req, res) {
  const body = req.body
  try {
    const players = await Player.create(body)
    return players
  } catch(err) {
    console.log(err)
  }
}
module.exports.createPlayer = createPlayer

/* UPDATE */
const updatePlayer = async function(req, res) {
  const playerId = req.params.id
  const name = req.body.name
  if (playerId !== "undefined"){
    try {
      const players = await Player.update({ name: name }, { where: {id: playerId}})
      return players
    } catch(err) {
      console.log(err)
    }
  }
}
module.exports.updatePlayer = updatePlayer

/* DELETE */
const deletePlayer = async function(req, res) {
  const playerId = req.params.id
  if (playerId !== "undefined")
  {
    try {
      const players = await Player.findOne({ where: {id: playerId}})
      return players.destroy()
    } catch(err) {
      console.log(err)
    }
  } else {
    console.log("error no params")
  }
}
module.exports.deletePlayer = deletePlayer

/* GET ALL */
const getAllPlayer = async function(req, res) {
  try {
    const players = await Player.findAll({})
    return res.json(players)
  } catch(err) {
    console.log(err)
  }
}
module.exports.getAllPlayer = getAllPlayer

/* GET ONE */
const getOnePlayer = async function(req, res) {
  const playerId = req.params.id
  if (playerId !== "undefined")
  {
    try {
      const players = await Player.findOne({ where: {id: playerId}})
      return players
    } catch(err) {
      console.log(err)
    }
  } else {
    console.log("error no params")
  }
}
module.exports.getOnePlayer = getOnePlayer