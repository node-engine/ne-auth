var passportLocal = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');


var neLocalStrategyLogin = function  (passport, neUsersModel) {

    passport.use('neLocalStrategyLogin',new passportLocal(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },

        function(req, email, password, done) {

            process.nextTick(function() {

                neUsersModel.findOne({"local.email": email}, function (err, user) {
                    if (err) {
                        console.log("nePassport neLocal: Unknown error")
                        return done(err);
                    }
                    if (!user) {
                        console.log("nePassport neLocal: Can not match username")
                        return done(null, null, {message: 'Can not match username'});
                    }
                    var validPassword = function (password) {
                        if (user.validPassword(password)) {
                            console.log("nePassport neLocal: Successfully authenticated")

                            var tokenExpire = 60000

                            var token = jwt.sign(
                                {
                                    // payload goes here
                                    user: user._id,
                                    scope: []
                                },
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: tokenExpire
                                }
                            );

                            return done(null, user, {token: token, tokenExpire: tokenExpire});
                        }
                        else {
                            console.log("nePassport neLocal: Password incorrect")
                            return done(null, null, {message: 'Password incorrect'})
                        }
                    };
                    validPassword(password)

                });
            })
        }
    ));

}

module.exports = neLocalStrategyLogin;