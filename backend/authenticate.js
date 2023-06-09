const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('./config.js');

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser()); 

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);

        Users.findOne({_id: jwt_payload._id}).then((user) => {
            if (user) return done(null, user);
            else return done(null, false);
        }).catch(err => {
            if (err) return done(err, false);
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false}); 
