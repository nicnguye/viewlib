const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Sequelize = require('sequelize');
const { User } = require('../models');
const CONFIG = require('./config.json')

module.exports = function(passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = CONFIG.jwtSecret;
  passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const userExist = await User.findOne({where: {uuid: jwt_payload.sub}})
      if (userExist) {
        return done(null, userExist);
      } else {
        return done(null, false);
      }
    } catch(err) {
      return done(err, false);
    }
    }))
  }
