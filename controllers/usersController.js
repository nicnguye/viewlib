const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const CONFIG = require('../config/config.json');

/* REGISTER USER */
const register = async function (req, res) {
  const { username, password, mail } = req.body;
  try {
    const userExist = await User.findOne({ where: { mail: mail } });
    if (userExist) {
      return res.status(400).json({
        success: false,
        msg: 'User already exist'
      });
    }

    const hashPassword = bcrypt.hashSync(password.trim(), 10);
    const user = await User.create({
      uuid: uuidv4(),
      username: username.trim(),
      password: hashPassword,
      mail: mail.trim()
    });
    return res.status(200).json({
      success: true,
      msg: 'user registered',
      user: user
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.register = register;

/* LOGIN USER */
const login = async function (req, res) {
  const { username, password } = req.body;
  try {
    const userExist = await User.findOne({ where: { username: username } });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        msg: 'User not found'
      });
    }

    bcrypt.compare(password.trim(), userExist.password).then((result) => {
      if (result === false) {
        return res.status(401).json({
          success: false,
          msg: 'Wrong password !'
        });
      }
      const token = jwt.sign({ sub: userExist.uuid },
        CONFIG.jwtSecret,
        { expiresIn: 604800 }); // 1 week
      return res.status(200).json({
        success: true,
        msg: 'logged in !',
        token: `JWT ${token}`,
        user: {
          uuid: userExist.uuid,
          username: userExist.username,
          mail: userExist.mail
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.login = login;
