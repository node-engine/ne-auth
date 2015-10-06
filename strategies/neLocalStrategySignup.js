var passportLocal = require('passport-local').Strategy;

var neLocalStrategySignup = function  (passport, neUsersModel) {

    passport.use('neLocalStrategySignup',new passportLocal(
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
                    if (user) {
                        console.log("nePassport neLocal: Username already used")
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    else {
                        var newUser = new neUsersModel

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.profile.emails.push(email);

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });
        }
    ));

};

module.exports = neLocalStrategySignup;