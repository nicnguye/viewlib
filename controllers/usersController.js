const { User } = require('../models')
const uuidv4 = require('uuid/v4')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')

/* CREATE USER */
const register = async function(req, res) {
  const { username, password, mail } = req.body
  try {
    const userExist = await User.findOne({ where: {mail: mail}})
    if (userExist)
      return res.send("User already exist")
    else {
      let hashPassword = bcrypt.hashSync(password.trim(), 10)
      const user = await User.create({
        uuid: uuidv4(),
        username: username.trim(),
        password: hashPassword,
        mail: mail.trim()
      })
      return res.json(user)
    }
  } catch(err) {
    console.log(err)
  }
}
module.exports.register = register

/* LOGIN USER */
const login = async function(req, res) {
  const { mail, password } = req.body
  try {
    const userExist = await User.findOne({ where: {mail: mail}})
    if (!userExist)
      return res.send("User doesn't exist")
    else {
      bcrypt.compare(password.trim(), userExist.password).then((result) => {
        if (result === false)
          return res.send("Wrong password !")
        else {
          return res.json("logged in !")
        }
      })
    }
  } catch(err) {
    console.log(err)
  }
}
module.exports.login = login