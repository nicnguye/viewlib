const { Players } = require('../models')
const Sequelize = require('sequelize')

/* GET ALL */
const getAll = async function(req, res) {
  try {
    const players = await Players.findAll({})
    return players
  } catch(err) {
    console.log(err)
  }
}
module.exports.getAll = getAll