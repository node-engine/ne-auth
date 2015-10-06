var BearerStrategy = require('passport-http-bearer').Strategy;

var neSuperTokenStrategy =  function (passport, neSuperToken){

    passport.use('neSuperTokenStrategy', new BearerStrategy(
        function (token, done) {

            if (token !== neSuperToken){
                return done(null, false);
            }
            else {
                return done(null, token)
            }
        }
    ));

};

module.exports = neSuperTokenStrategy