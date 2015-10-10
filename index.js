var express = require('express');

var gulp = require('gulp');
var babel = require('gulp-babel');

var fs = require ('fs');
var _ = require('lodash');

var jwtValidate = require('./jwt/jwtValidate');

//////////////////////////////
// Import support modules
//////////////////////////////

var neSuperToken = process.env.NE_SUPER_TOKEN;

var neUsersModel = require ('./users/neUsersModel');

var usersApiRoutesTemplate = require('./users/usersApiRoutesTemplate');


//////////////////////////////
// Setup
//////////////////////////////

var neAuth = {

    neUsers: neUsersModel,

    config: function (passport){

        //Configure strategies
        var dirToRead = __dirname + "/strategies";
        fs.readdirSync(dirToRead).forEach(function(filename) {

            var requirePath = "./strategies/" + filename;
            var strategy = require(requirePath);
            strategy(passport, neUsersModel);

        });

    },

    init: function (server, passport){

        server.use(passport.initialize());

        server.use(jwtValidate());

    },

    routes: function (server, passport, options){

        //Configure routes
        var dirToRead = __dirname + "/routes";
        fs.readdirSync(dirToRead).forEach(function(filename) {

            var requirePath = "./routes/" + filename;
            var route = require(requirePath);
            route(server, passport);

        });

        // Configure API routes
        if (options && options.insecure === true){
            var routerForUsersSuper = express.Router();
            var populatePathForUsersSuper = "";
            var permissionsArrayForUsersSuper = ['reader'];
            usersApiRoutesTemplate(routerForUsersSuper, neUsersModel, permissionsArrayForUsersSuper, populatePathForUsersSuper);
            server.use('/api/users', routerForUsers);
        }
        else{
            var routerForUsers = express.Router();
            var permissionsArrayForUsers = ['admin'];
            var populatePathForUsers = "";
            if (options && options.usersDetail === true){
                populatePathForUsers = "neusersdetail";
            }
            usersApiRoutesTemplate(routerForUsers, neUsersModel, permissionsArrayForUsers, populatePathForUsers);
            server.use('/api/users', routerForUsers);
        }
    },


    validateToken: function(){
        var jwtValidate = require('./jwt/jwtValidate');
        return jwtValidate()
    },

    checkPermissions: function (permissions) {
        var jwtPermissions = require('./jwt/jwtPermissions');
        return jwtPermissions(permissions)
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

    gulpCompileHandlers: function (){

        gulp.src('./node_modules/ne-auth/handlers/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/handlers/'));

        return undefined

    }
};

module.exports = neAuth;



/*



 var routerForSuper = express.Router();
 var strategyNameForSuper = "neSuperTokenStrategy";
 var populatePathForSuper = "";
 apiRoutesTemplate(routerForSuper, null, strategyNameForSuper, null, populatePathForSuper);
 server.use('/admin/api/tokens/admin', routerForSuper);





 var neSuperTokenStrategy = require('./strategies/neSuperTokenStrategy');
 neSuperTokenStrategy(passport, neSuperToken);



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


 routes: function (server, passport){



 var localStrategyRoutes = require('./authRoutes/localStrategyRoutes');
 localStrategyRoutes(server, passport);

 var logoutRoute = require('./authRoutes/logoutRoute');
 logoutRoute(server, passport);

 var facebookStrategyRoutes = require('./authRoutes/facebookStrategyRoutes');
 facebookStrategyRoutes(server, passport);



 },

 neSuperToken: neSuperToken





 */

