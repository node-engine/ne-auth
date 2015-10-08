var passportLocal = require('passport-local').Strategy;
var jwtSign = require('../jwt/jwtSign');

var localStrategyChangePassword = function  (passport, neUsersModel) {

    passport.use('localStrategyChangePassword',new passportLocal(
        {
            usernameField: '_id',
            passwordField: 'password',
            passReqToCallback : true
        },

        function(req, _id, password, done) {

            process.nextTick(function() {

                neUsersModel.findOne({"_id": _id}, function (err, user) {
                    if (err) {
                        console.log("neAuth localStrategyChangePassword: Unknown error")
                        return done(err);
                    }
                    if (user) {
                        console.log("neAuth localStrategyChangePassword: User found")

                        user.local.password = user.generateHash(password);
                        user.local.active = true;
                        var log = {
                            description: "Local login password changed"
                        }
                        user.log.push(log);
                        user.save(function(err) {
                            if (err){
                                console.log(err);
                            }
                            console.log("neAuth localStrategyChangePassword: User password changed")
                            var jwt = jwtSign(user);
                            return done(null, user, {token: jwt.token, expire: jwt.expire});
                        });

                    }
                    else {
                        return done(null, null, {error: 'userNotFound'});
                    }

                });
            });
        }
    ));

};

module.exports = localStrategyChangePassword;