if (process.env.NE_AUTO) {
    var express = require(process.env.NE_AUTO).express;
}
else {
    var express = require('express');
}

var neUsersModel = require ('../users/neUsersModel');
var checkPermissionsReturn = require('../jwt/jwtPermissionsReturn');
var router = express.Router();

var neLocalStrategyRoutes = function (server, passport){

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

     router.post('/change-email', function(req,res, next){

     passport.authenticate('localStrategyChangeEmail', function(err, user, info){

     if (err !== null) {
     var redirectPath = '/profile' + '?message=Error'
     return res.redirect(redirectPath);
     }
     else if (info.error) {
     var redirectPath = '/profile' + '?message='+ info.error;
     return res.redirect(redirectPath);
     }
     else if (info.token) {
     return res.cookie('token' ,info.token, { httpOnly: true, expire : new Date() + info.expire })
     .redirect('/profile');
     }
     else{
     var redirectPath = '/profile' + '?message=UnknownError';
     return res.redirect(redirectPath);
     }

     })(req, res, next);
     });

     */

    router.post('/change/*', function(req, res, next) {

        var userId = req.claims.user;

        if(checkPermissionsReturn([userId, 'admin'],req) === true) {
            next();
        }
        else {
            res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
        }

    })

    router.post('/change/email', function(req, res, next){

        neUsersModel.findOne({"_id": req.claims.user }, function (err, user) {

            if(user){

                console.log('');
                console.log('');
                console.log('neAuth localStrategyRoutes Found user with user._id');
                console.log(user._id);
                console.log('');
                console.log('');

                user.local.email = req.body.email;
                user.local.active = true;
                var log = {
                    description: "Local login email changed to " + req.body.email
                }
                user.log.push(log);
                user.save(function(err) {
                    if (err){
                        console.log(err);
                    }
                    console.log('');
                    console.log('');
                    console.log('neAuth LocalStrategy: Email changed');
                    console.log('');
                    console.log('');

                    return res.redirect('/profile?message=EmailChanged')
                });
            }
            else {
                return res.redirect('/login?message=ErrorWithEmailChange');
            }

        })



    });

    router.post('/change/password', function(req, res, next){

        neUsersModel.findOne({"_id": req.body._id }, function (err, user) {

            if(user.validPassword(req.body.oldpassword)){

                user.local.password = user.generateHash(req.body.password);
                user.local.active = true;
                var log = {
                    description: "Local login password changed"
                }
                user.log.push(log);
                user.save(function(err) {
                    if (err){
                        console.log(err);
                    }
                    console.log('neAuth LocalStrategy: Password changed');
                    return res.redirect('/profile?message=PasswordChanged')
                });
            }
            else{
                console.log('neAuth LocalStrategy: Old password did not match');
                return res.redirect('/profile?message=ErrorChangingPassword')
            }

        })

    });

    server.use('/auth/local', router);

};

module.exports = neLocalStrategyRoutes;


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