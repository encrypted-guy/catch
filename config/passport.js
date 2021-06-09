const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;
const User = require('../model/User');

module.exports =  (passport) => {
    passport.use(new LocalStrategy( async ( username, password, done) => {
        try {
            const user = await User.findOne( {email :username }).select('+password');
            if(!user) {
                return done(null, false, { message: 'invalid credentials' } );
            }

            if( await bcrypt.compare(password, user.password)) {
                return done(null, user,  { message: 'welcome' }  )
            }else{
                return done(null, false,  { message: 'invalid credentials' }  )
            }

        } catch (error) {
            console.log(ERROR(`passport ${error}`));
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
/*
module.exports =  (passport) => {
    passport.use(new LocalStrategy( async ( username, password, done) => {
        try {
            const user = await User.findOne( {email :username }).select('+password');
            if(!user) {
                return done(null, false, console.log(ERROR(` USER NOT FOUND`)) );
            }

            if( await bcrypt.compare(password, user.password)) {
                return done(null, user, console.log(SUCCESS('you are logged in')) )
            }else{
                return done(null, false, console.log(ERROR('password incorect')) )
            }

        } catch (error) {
            console.log(ERROR(`passport ${error}`));
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
*/