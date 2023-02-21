const passport = require('passport');

const LocalStrategy = require('./strategies/loca.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);