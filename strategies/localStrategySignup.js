var passportLocal = require('passport-local').Strategy;
var jwtSign = require('../jwt/jwtSign');

var neLocalStrategySignup = function  (passport, neUsersModel) {

    passport.use('localStrategySignup',new passportLocal(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },

        function(req, email, password, done) {

            process.nextTick(function() {

                neUsersModel.findOne({"local.email": email}, function (err, user) {
                    if (err) {
                        console.log("neAuth localStrategySignup: Unknown error")
                        return done(err);
                    }
                    if (user) {
                        console.log("neAuth localStrategySignup: Username already used")
                        return done(null, null, {error: 'usernameTaken'});
                    }
                    else {
                        var newUser = new neUsersModel

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.active = true;
                        newUser.profile.emails.push(email);
                        newUser.permissions.push("reader");

                        newUser.save(function(err) {
                            if (err){
                                console.log(err);
                            }
                            var jwt = jwtSign(newUser);
                            return done(null, newUser, {token: jwt.token, expire: jwt.expire});
                        });
                    }

                });
            });
        }
    ));

};

module.exports = neLocalStrategySignup;