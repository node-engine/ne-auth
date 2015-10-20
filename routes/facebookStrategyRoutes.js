if (process.env.NE_AUTO) {
    var express = require(process.env.NE_AUTO).express;
}
else {
    var express = require('express');
}

var router = express.Router();

var facebookStrategyRoutes = function (server, passport){

    router.get('/', passport.authenticate('facebookStrategy',
        {
            scope : ['email'],
            session: false
        }
    ));

    router.get('/callback', function(req,res, next){

        passport.authenticate('facebookStrategy', function(err, user, info){

            if (err !== null) {
                return next(err);
            }
            if (user === null) {
                var redirectPath = '/login' + '?message=' + info.message;
                return res.redirect(redirectPath);
            }
            res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
                .redirect('/profile');

        })(req, res, next);
    });


    router.get('/callback-old',
        passport.authenticate('facebookStrategy',
            {
                successRedirect : '/profile',
                failureRedirect : '/',
                session: false
            }
        )
    );


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
};

module.exports = facebookStrategyRoutes;