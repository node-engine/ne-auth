var passportLocal = require('passport-local').Strategy;
var jwtSign = require('../jwt/jwtSign');


var neLocalStrategyLogin = function  (passport, neUsersModel) {

    passport.use('localStrategyLogin',new passportLocal(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true

        },

        function(req, email, password, done) {

            process.nextTick(function() {

                neUsersModel.findOne({"local.email": email}, function (err, user) {
                    if (err) {
                        console.log("neAuth localStrategy: Unknown error")
                        return done(err);
                    }
                    if (!user) {
                        console.log("neAuth localStrategy: Can not match username")
                        return done(null, null, {error: 'usernameNotFound'});
                    }
                    var validPassword = function (password) {
                        if (user.validPassword(password)) {
                            console.log("neAuth localStrategy: Successfully authenticated")

                            var jwt = jwtSign(user);
                            console.log('jwt----------------------------------------------')
                            console.log(jwt)

                            return done(null, user, {token: jwt.token, expire: jwt.expire});
                        }
                        else {
                            console.log("neAuth localStrategy: Password incorrect")
                            return done(null, null, {error: 'passwordIncorrect'})
                        }
                    };
                    validPassword(password)

                });
            })
        }
    ));

}

module.exports = neLocalStrategyLogin;