var express = require('express');

var neLocalStrategyRoutes = function (server, passport){

    var router = express.Router();

    router.get('/', passport.authenticate('neFacebookStrategy',
        {
            scope : ['email'],
            session: false
        }
    ));

    router.get('/callback',
        passport.authenticate('neFacebookStrategy',
            {
            successRedirect : '/profile',
            failureRedirect : '/',
            session: false
            }
        ));
    /*
    router.get('/link', passport.authorize('neFacebookStrategy', { scope : ['email'] }));

    router.get('/add/callback',
        passport.authorize('neFacebookStrategy',
            {
                successRedirect : '/profile',
                failureRedirect : '/'
            }
        ));
    */

    server.use('/auth/facebook', router);
}

module.exports = neLocalStrategyRoutes;