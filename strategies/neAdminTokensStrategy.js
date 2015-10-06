var BearerStrategy = require('passport-http-bearer').Strategy;
var neSuperToken = process.env.NE_SUPER_TOKEN;

var neAdminTokensStrategy = function  (passport,neAdminTokensModel ){

    passport.use('neAdminTokensStrategy', new BearerStrategy(
        function (token, done) {
            neAdminTokensModel.findOne({'token': token}, function (err, tokenObject) {
                if (err) {
                    console.log("nePassport neAdminTokensStrategy: Unknown error")
                    return done(err);
                }
                if (!tokenObject) {
                    if(token === neSuperToken){
                        console.log("nePassport neAdminTokensStrategy: Used neSuperToken for authentication")
                        return done(null, {used: 'superToken'}, {scope: 'all'})
                    }
                    else{
                        console.log("nePassport neAdminTokensStrategy: Authentication failed token not matched")
                        return done(null, false);
                    }
                }
                console.log("nePassport neAdminTokensStrategy: Authentication successfull")
                return done(null, tokenObject, {scope: 'all'});
            });
        }
    ));

};

module.exports = neAdminTokensStrategy




