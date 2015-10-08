var express = require('express');


var neLocalStrategyRoutes = function (server, passport){

    var router = express.Router();

    router.post('/login', function(req,res, next){

        passport.authenticate('localStrategyLogin', function(err, user, info){

            if (err !== null) {
                return next(err);
            }
            else if (info.error) {
                var redirectPath = '/login' + '?message='+ info.error;
                return res.redirect(redirectPath);
            }
            else {
                return res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
                    .redirect('/profile');
            }

        })(req, res, next);
    });

    router.post('/signup', function(req,res, next){

        passport.authenticate('localStrategySignup', function(err, user, info){

            if (err !== null) {
                return next(err);
            }
            else if (info.error) {
                var redirectPath = '/signup' + '?message='+ info.error;
                return res.redirect(redirectPath);
            }
            else {
                return res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
                    .redirect('/profile');
            }

        })(req, res, next);
    });


    router.post('/login-old',

        passport.authenticate('localStrategyLogin',
            {
                successRedirect: '/profile',
                failureRedirect: '/login?message=AuthenticationFailed-PleaseTryAgain',
                session: false
            }
        )
    );

    router.post('/signup-old',

        passport.authenticate('localStrategySignup',
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