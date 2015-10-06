var express = require('express');


var neLocalStrategyRoutes = function (server, passport){

    var router = express.Router();

    router.post('/login', function(req,res, next){

        passport.authenticate('neLocalStrategyLogin', function(err, user, info){

            if (err !== null) {
                return next(err);
            }
            if (user === null) {
                var redirectPath = '/login' + '?message=' + info.message;
                return res.redirect(redirectPath);
            }
            res.cookie('neAuth' ,info.token, { httpOnly: true, expire : new Date() + info.tokenExpire })
                .send('Cookie is set');

        })(req, res, next);
    });


    router.post('/login-old',

        passport.authenticate('neLocalStrategyLogin',
            {
                successRedirect: '/profile',
                failureRedirect: '/login?message=AuthenticationFailed-PleaseTryAgain',
                session: false
            }
        )
    );

    router.post('/signup',

        passport.authenticate('neLocalStrategySignup',
            {
                successRedirect: '/profile',
                failureRedirect: '/signup',
                session: false
            }
        )
    );

    /*
    router.post('/link',

        passport.authenticate('neLocalStrategySignup',
            {
                successRedirect: '/profile',
                failureRedirect: '/',
                failureFlash: true
            }
        )
    );
    */



    server.use('/auth/local', router);

};

module.exports = neLocalStrategyRoutes;