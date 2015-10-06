var BearerStrategy = require('passport-http-bearer').Strategy;
var neSuperToken = process.env.NE_SUPER_TOKEN;

var neEditorTokensStrategy = function  (passport, neEditorTokensModel ) {

    passport.use('neEditorTokensStrategy', new BearerStrategy(
        function (token, done) {
            neEditorTokensModel.findOne({'token': token}, function (err, tokenObject) {
                if (err) {
                    console.log("nePassport neEditorTokensStrategy: Unknown error")
                    return done(err);
                }
                if (!tokenObject) {
                    if(token === neSuperToken){
                        console.log("nePassport neEditorTokensStrategy: Used neSuperToken for authentication")
                        return done(null, {used: 'superToken'}, {scope: 'all'})
                    }
                    else{
                        console.log("nePassport neEditorTokensStrategy: Authentication failed token not matched")
                        return done(null, false);
                    }
                }
                console.log("nePassport neEditorTokensStrategy: Authentication successfull")
                return done(null, tokenObject, {scope: 'all'});
            });
        }
    ));

};

module.exports = neEditorTokensStrategy;