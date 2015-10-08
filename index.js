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

    validateToken: function(){
        var jwtValidate = require('./jwt/jwtValidate');
        return jwtValidate()
    },

    checkPermissions: function (permissions) {
        var jwtPermissions = require('./jwt/jwtPermissions');
        return jwtPermissions(permissions)
    },

    authRoutes: function (server, passport){

        var localStrategyRoutes = require('./authRoutes/localStrategyRoutes');
        localStrategyRoutes(server, passport);

        var facebookStrategyRoutes = require('./authRoutes/facebookStrategyRoutes');
        facebookStrategyRoutes(server, passport);

    },

    apiRoutes: function (server, passport, options){

        /*

         var routerForSuper = express.Router();
         var strategyNameForSuper = "neSuperTokenStrategy";
         var populatePathForSuper = "";
         apiRoutesTemplate(routerForSuper, null, strategyNameForSuper, null, populatePathForSuper);
         server.use('/admin/api/tokens/admin', routerForSuper);

         */

        var routerForUsers = express.Router();
        var permissionsArrayForUsers = ['admin'];
        var populatePathForUsers = "";
        if (options && options.userDetail === true){
            populatePathForUsers = "neuserdetail";
        }
        apiRoutesTemplate(routerForUsers, neUsersModel, permissionsArrayForUsers, populatePathForUsers);
        server.use('/api/users', routerForUsers);



        if (options && options.insecure === true){
            var routerForUsersSuper = express.Router();
            var populatePathForUsersSuper = "";
            var permissionsArrayForUsersSuper = ['reader'];
            apiRoutesTemplate(routerForUsersSuper, neUsersModel, permissionsArrayForUsersSuper, populatePathForUsersSuper);
            server.use('/api/users', routerForUsers);
        }

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

