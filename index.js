var express = require('express');

var gulp = require('gulp');
var babel = require('gulp-babel');

var fs = require ('fs');
var _ = require('lodash');


//////////////////////////////
// Models
//////////////////////////////

var neSuperToken = process.env.NE_SUPER_TOKEN;

var neUsersModel = require ('./models/neUsersModel');


////////////////////////////////////////////////////////////


var apiRoutesTemplate = require('./apiRoutesTemplate');


////////////////////////////////////////////////////////////

var neAuth = {


//////////////////////////////
// Setup
//////////////////////////////

    neSuperToken: neSuperToken,

    neUsers: neUsersModel,

    init: function (server, passport){

        var neSuperTokenStrategy = require('./strategies/neSuperTokenStrategy');
        neSuperTokenStrategy(passport, neSuperToken);

        var localStrategyLogin = require('./strategies/localStrategyLogin');
        localStrategyLogin(passport, neUsersModel);

        var localStrategySignup = require('./strategies/localStrategySignup');
        localStrategySignup(passport, neUsersModel);

        var facebookStrategy = require('./strategies/facebookStrategy');
        facebookStrategy(passport, neUsersModel);

        server.use(passport.initialize());

    },

    validateToken: function (){

        var checkJwt = require('express-jwt');

        return checkJwt({
            secret: process.env.JWT_SECRET,
            requestProperty: 'claims',
            getToken: function fromHeaderOrQuerystring(req) {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                }
                else if (req.query && req.query.token) {
                    return req.query.token;
                }
                else if (req.cookies && req.cookies.token) {
                    return req.cookies.token;
                }
                return null;
            }
        })
    },

    checkPermissions: function (permissions) {
        return function (req, res, next) {
            var tokenPermissions = req.claims.scope;
            var check = _.any(permissions, function (scope) {
                return _.contains(tokenPermissions, scope);
            });
            if(check){
                next();
            }
            else{
                res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
            }
        }
    },

    authRoutes: function (server, passport){

        var localStrategyRoutes = require('./authRoutes/localStrategyRoutes');
        localStrategyRoutes(server, passport);

        var facebookStrategyRoutes = require('./authRoutes/facebookStrategyRoutes');
        facebookStrategyRoutes(server, passport);

    },

    apiRoutes: function (server, passport){

        var routerForSuper = express.Router();
        var strategyNameForSuper = "neSuperTokenStrategy";
        var populatePathForSuper = "";
        apiRoutesTemplate(routerForSuper, passport, strategyNameForSuper, null, populatePathForSuper);
        server.use('/admin/api/tokens/admin', routerForSuper);

    },

    adminRoutes: function (server, passport){

        var routerForAdminTokenAssign = express.Router();
        var strategyNameForAdminTokenAssign = "neSuperTokenStrategy";
        var populatePathForAdminTokenAssign = "";

        router.post ('/',
            passport.authenticate(strategyNameForAdminTokenAssign, {session: false}),

            function(req, res){

                // Add token to user
                axios.put

                // Add user to token
                axios.put

                // Execute
                axios.all

            }
        )

        server.use('/admin/api/tokens/admin/touser', routerForAdminTokenAssign);

    },


//////////////////////////////
// neSuperAdmin
//////////////////////////////

    neSuperStrategyRoutesUserAssign: function (server, passport){

        var router = express.Router();
        var strategyName = "neSuperTokenStrategy";
        var populatePath = "";

        router.post('/',

            passport.authenticate(strategyName, {session: false}),

            function(req, res){
                console.log(req.body)
            });


        server.use('/admin/api/tokens/admin/touser', router);
    },

////////////////////////////////////////////////
// Passport Strategies for other ne Modules
////////////////////////////////////////////////

    gulpCompileHandlers: function (){

        gulp.src('./node_modules/ne-auth/handlers/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/handlers/'));

        return undefined

    }
};

module.exports = neAuth;

