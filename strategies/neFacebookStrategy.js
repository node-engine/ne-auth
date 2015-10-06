var passportFacebook = require('passport-facebook').Strategy

var neFacebookStrategy = function  (passport, neUsersModel) {

    passport.use('neFacebookStrategy',new passportFacebook(
        {
            clientID        : process.env.FACEBOOKAUTH_CLIENTID,
            clientSecret    : process.env.FACEBOOKAUTH_CLIENTSECRET,
            callbackURL     : process.env.FACEBOOKAUTH_CALLBACKURL
        },
        function(token, refreshToken, profile, done) {

            console.log('--------------------------------------------------FACEBOOK1');
            console.log(profile);
            console.log('token');
            console.log(token);

            process.nextTick(function() {

                console.log('--------------------------------------------------FACEBOOK2');

                neUsersModel.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    console.log('--------------------------------------------------FACEBOOK3');

                        if (err){
                            console.log('nePassport neFacebookStrategy: Unknown error');
                            return done(err);
                        }
                        console.log('--------------------------------------------------FACEBOOK4');

                        if (user) {
                            console.log('nePassport neFacebookStrategy: Authentication successfull');
                            return done(null, user);
                        }
                        if (!user){
                            console.log('nePassport neFacebookStrategy: No user found');
                            var newUser            = new neUsersModel;

                            newUser.facebook.id    = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.active = true;
                            newUser.profile.name.displayName  = profile.displayName;
                            //newUser.profile.emails.push(profile.emails[0].value);
                            console.log('--------------------------------------------------FACEBOOK5');
                            console.log(newUser);
                            newUser.save(function(err) {
                                if (err){
                                    throw err;
                                }
                                else{
                                    console.log('nePassport neFacebookStrategy: New user created');
                                    return done(null, newUser);
                                }

                            });
                        }

                    console.log('--------------------------------------------------FACEBOOK6');

                });

            })
        }
    ));

};

module.exports = neFacebookStrategy;