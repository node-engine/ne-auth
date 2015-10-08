var passportLocal = require('passport-local').Strategy;
var jwtSign = require('../jwt/jwtSign');

var localStrategyChangePassword = function  (passport, neUsersModel) {

    passport.use('localStrategyChangeEmail',new passportLocal(
        {
            usernameField: '_id',
            passwordField: 'email',
            passReqToCallback : true
        },

        function(req, _id, email, done) {

            process.nextTick(function() {

                neUsersModel.findOne({"_id": _id}, function (err, user) {
                    if (err) {
                        console.log("neAuth localStrategyChangeEmail: Unknown error")
                        return done(err);
                    }
                    if (user) {
                        console.log("neAuth localStrategyChangeEmail: User found")

                        user.local.email = email;
                        user.local.active = true;
                        var log = {
                            description: "Local login email changed to " + email
                        }
                        user.log.push(log);
                        user.save(function(err) {
                            if (err){
                                console.log(err);
                            }
                            console.log("neAuth localStrategyChangeEmail: User email changed")
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