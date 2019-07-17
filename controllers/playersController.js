const { Player } = require('../models')
const uuidv4 = require('uuid/v4')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/* CREATE */
const createPlayer = async function(req, res) {
  const { name, position, number } = req.body
  try {
    const players = await Player.create({
      uuid: uuidv4(),
      name: name.trim(),
      position: position.trim(),
      number: number
    })
    return res.json(players)
  } catch(err) {
    console.log(err)
  }
}
module.exports.createPlayer = createPlayer

/* UPDATE */
const updatePlayer = async function(req, res) {
  const playerUuid = req.params.uuid
  const { name, position, number} = req.body
  if (playerUuid !== "undefined"){
    try {
      const players = await Player.update({ name, position,number }, { where: {uuid: playerUuid}})
      return res.json(players)
    } catch(err) {
      console.log(err)
    }
  }
}
module.exports.updatePlayer = updatePlayer

/* DELETE */
const deletePlayer = async function(req, res) {
  const playerUuid = req.params.uuid
  if (playerUuid !== "undefined")
  {
    try {
      const players = await Player.findOne({ where: {uuid: playerUuid}})
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
  const playerUuid = req.params.uuid
  if (playerUuid !== "undefined")
  {
    try {
      const players = await Player.findOne({ where: {uuid: playerUuid}})
      return res.json(players)
    } catch(err) {
      console.log(err)
    }
  } else {
    console.log("error no params")
  }
}
module.exports.getOnePlayer = getOnePlayer