const { Player } = require('../models')
const uuidv4 = require('uuid/v4')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/* CREATE */
const createPlayer = async function(req, res) {
  const { name, position, number } = req.body
  try {
    const player = await Player.create({
      uuid: uuidv4(),
      name: name.trim(),
      position: position.trim(),
      number: number
    })
    return res.status(200).json({
      success: true,
      msg: "Player created",
      player: player
    })
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
      const player = await Player.findOne({ where: {uuid: playerUuid}})
      if (!player)
        return res.json({
          success: false,
          msg: "Player doesn't exist !"
        })
      const newPlayer = await player.update({ name, position, number }, { where: {uuid: playerUuid}})
      return res.status(200).json({
        success: true,
        msg: "Player updated",
        player: newPlayer
      })
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
      const player = await Player.findOne({ where: {uuid: playerUuid}})
      if (!player)
        return res.json({
          success: false,
          msg: "Player doesn't exist !"
        })
      else {
        const result = await player.destroy()
        return res.status(200).json({
          success: true,
          result: result
        })
      }
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
    if (!players.length)
      return res.json({
        success: false,
        msg: "No player!"
      })
    else
      return res.json({
        success: true,
        msg: "Players fetched",
        players: players
      })
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
      const player = await Player.findOne({ where: {uuid: playerUuid}})
      if (!player)
        return res.json({
          success: false,
          msg: "Player doesn't exist !"
        })
      else
        return res.json({
          success: true,
          msg: "player found !",
          player: player
        })
    } catch(err) {
      console.log(err)
    }
  } else {
    console.log("error no params")
  }
}
module.exports.getOnePlayer = getOnePlayer