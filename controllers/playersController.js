const { Player } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/* GET ALL */
const getAll = async function(req, res) {
  try {
    const players = await Player.findAll({})
    return players
  } catch(err) {
    console.log(err)
  }
}
module.exports.getAll = getAll