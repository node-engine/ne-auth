var express = require('express');


var neLocalStrategyRoutes = function (server, passport){

    var router = express.Router();

    router.post('/login', function(req,res, next){

        passport.authenticate('localStrategyLogin', function(err, user, info){

            if (err !== null) {
                var redirectPath = '/login' + '?message=Error'
                return res.redirect(redirectPath);
            }
            else if (info.error) {
                var redirectPath = '/login' + '?message='+ info.error;
                return res.redirect(redirectPath);
            }
            else if (info.token){
                return res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
                    .redirect('/profile');
            }
            else{
                var redirectPath = '/login' + '?message=UnknownError';
                return res.redirect(redirectPath);
            }

        })(req, res, next);
    });

    router.post('/signup', function(req,res, next){

        passport.authenticate('localStrategySignup', function(err, user, info){

            if (err !== null) {
                var redirectPath = '/signup' + '?message=Error'
                return res.redirect(redirectPath);
            }
            else if (info.error) {
                var redirectPath = '/signup' + '?message='+ info.error;
                return res.redirect(redirectPath);
            }
            else if (info.token) {
                return res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
                    .redirect('/profile');
            }
            else{
                var redirectPath = '/signup' + '?message=UnknownError';
                return res.redirect(redirectPath);
            }

        })(req, res, next);
    });


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