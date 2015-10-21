var passportFacebook =  require('passport-facebook').Strategy;

var jwtSign = require('../jwt/jwtSign');

var neFacebookStrategy = function  (passport, neUsersModel) {

    passport.use('facebookStrategy',new passportFacebook(
        {
            clientID        : process.env.FACEBOOKAUTH_CLIENTID,
            clientSecret    : process.env.FACEBOOKAUTH_CLIENTSECRET,
            callbackURL     : process.env.FACEBOOKAUTH_CALLBACKURL
        },
        function(token, refreshToken, profile, done) {

            console.log(profile);
            console.log('token');
            console.log(token);

            process.nextTick(function() {

                neUsersModel.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    if (err){
                        console.log('neAuth facebookStrategy: Unknown error');
                        return done(err);
                    }
                    if (user) {
                        console.log('neAuth facebookStrategy: Authentication successfull');
                        var jwt = jwtSign(user);
                        return done(null, user, {token: jwt.token, expire: jwt.expire});
                    }
                    if (!user){
                        console.log('neAuth facebookStrategy: No user found, creating new user');
                        var newUser            = new neUsersModel;

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.active = true;
                        newUser.profile.name.displayName  = profile.displayName;
                        newUser.permissions.push("reader");
                        //newUser.profile.emails.push(profile.emails[0].value);
                        console.log(newUser);
                        newUser.save(function(err) {
                            if (err){
                                console.log(err);
                            }
                            else{
                                console.log('neAuth facebookStrategy: New user created');
                                var jwt = jwtSign(newUser);
                                return done(null, newUser, {token: jwt.token, expire: jwt.expire});
                            }

                        });
                    }

                });

            })
        }
    ));

};

module.exports = neFacebookStrategy;