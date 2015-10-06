var express = require('express');

var gulp = require('gulp');
var babel = require('gulp-babel');

var fs = require ('fs');


//////////////////////////////
// Models
//////////////////////////////

var neSuperToken = process.env.NE_SUPER_TOKEN;

var neAdminTokensModel = require ('./models/neAdminTokensModel');

var neEditorTokensModel = require ('./models/neEditorTokensModel');

var neReaderTokensModel = require ('./models/neReaderTokensModel');

var neUsersModel = require ('./models/neUsersModel');


////////////////////////////////////////////////////////////


var apiRoutesTemplate = require('./apiRoutesTemplate');


////////////////////////////////////////////////////////////

var nePassport = {


//////////////////////////////
// Setup
//////////////////////////////

    neSuperToken: neSuperToken,

    neAdminTokens: neAdminTokensModel,

    neEditorTokens: neEditorTokensModel,

    neUsers: neUsersModel,

    init: function (server, passport){

        var neSuperTokenStrategy = require('./strategies/neSuperTokenStrategy');
        neSuperTokenStrategy(passport, neSuperToken);

        var neAdminTokensStrategy = require('./strategies/neAdminTokensStrategy');
        neAdminTokensStrategy(passport, neAdminTokensModel);

        var neEditorTokensStrategy = require('./strategies/neEditorTokensStrategy');
        neEditorTokensStrategy(passport, neEditorTokensModel);

        var neLocalStrategyLogin = require('./strategies/neLocalStrategyLogin');
        neLocalStrategyLogin(passport, neUsersModel);

        var neLocalStrategySignup = require('./strategies/neLocalStrategySignup');
        neLocalStrategySignup(passport, neUsersModel);

        var neFacebookStrategy = require('./strategies/neFacebookStrategy');
        neFacebookStrategy(passport, neUsersModel);

        /*
        server.use(flash());

        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done){
            neUsersModel.findById(id, function(err, user){
                done(err, user);
            })
        });

        //secret:'anystring'
        server.use(expressSession(
            {
                secret: 'thesecretsvdfvsdfvsdfvdsfvdfv',
                saveUninitialized: true,
                resave: false
            }
        ));
        */

        server.use(passport.initialize());
        server.use(passport.session());

    },

    authRoutes: function (server, passport){

        var neLocalStrategyRoutes = require('./authRoutes/neLocalStrategyRoutes');
        neLocalStrategyRoutes(server, passport);

        var neFacebookStrategyRoutes = require('./authRoutes/neFacebookStrategyRoutes');
        neFacebookStrategyRoutes(server, passport);

    },

    apiRoutes: function (server, passport){

        var routerForSuper = express.Router();
        var strategyNameForSuper = "neSuperTokenStrategy";
        var populatePathForSuper = "";
        apiRoutesTemplate(routerForSuper, passport, strategyNameForSuper, neAdminTokensModel, populatePathForSuper);
        server.use('/admin/api/tokens/admin', routerForSuper);


        var routerForAdmin = express.Router();
        var strategyNameForAdmin = "neAdminTokensStrategy";
        var populatePathForAdmin = "";
        apiRoutesTemplate(routerForAdmin, passport, strategyNameForAdmin, neUsersModel, populatePathForAdmin);
        server.use('/admin/api/users', routerForAdmin);


        var routerForEditor = express.Router();
        var strategyNameForEditor = "neAdminTokensStrategy";
        var populatePathForEditor = "";
        apiRoutesTemplate(routerForEditor, passport, strategyNameForEditor, neEditorTokensModel, populatePathForEditor);
        server.use('/admin/api/tokens/editor', routerForEditor);

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

                var setUserOnToken = function(){

                    var f1 = '_id';
                    var v1 = req.body.tokenId;
                    var q1 = {};
                    q1[f1] = v1;

                    var config = {};
                    config['multi'] = false;
                    if (req.query.multi){
                        config['multi'] = true;
                    }

                    console.log("--------------------");
                    console.log("Put request received");

                    var fs1 = "user";
                    var vs1 = req.body.userId;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (vs1 != null) {
                        neAdminTokensModel
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc){
                                //res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (vs1 = null ){
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        //res.send(msg);
                        console.log("--------------------");
                    }


                    else {
                        var msg = "ERROR: Unknown reason";
                        console.error(msg);
                        //res.send(msg);
                        console.log("--------------------");
                    }
                };

                var setTokenOnUser = function() {

                    var f1 = '_id';
                    var v1 = req.body.userId;
                    var q1 = {};
                    q1[f1] = v1;

                    var config = {};
                    config['multi'] = false;
                    if (req.query.multi) {
                        config['multi'] = true;
                    }

                    console.log("--------------------");
                    console.log("Put request received");

                    var fs1 = "tokens.neAdmin";
                    var vs1 = req.body.tokenId;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (vs1 != null) {
                        neUsersModel
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc) {
                                //res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (vs1 = null) {
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        //res.send(msg);
                        console.log("--------------------");
                    }

                    else {
                        var msg = "ERROR: Unknown reason";
                        console.error(msg);
                        //res.send(msg);
                        console.log("--------------------");
                    }
                };


                setUserOnToken();
                setTokenOnUser();
                res.redirect('/super?super_token=super&admin_token=admin')
            });


        server.use('/admin/api/tokens/admin/touser', router);

    },

////////////////////////////////////////////////
// Passport Strategies for other ne Modules
////////////////////////////////////////////////

    gulpCompileHandlers: function (){

        gulp.src('./node_modules/ne-passport/handlers/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/handlers/'));

        return undefined

    }
};

module.exports = nePassport;



/*

 routes: function (server, passport){

 server.post('/passportget', function(req, res){

 var obj = req.body;
 var newDoc = new User(obj);
 newDoc.save(function (err, newDoc){
 if (err) return console.error(err);
 res.send(newDoc)
 })

 });

 server.get('/passportget',
 passport.authenticate('neMongoRestStrategy', {session: false}),
 function(req, res){
 res.json({
 test: 'This is the data'
 })
 });

 }

 */


/*

 // process.nextTick(function(){
 User.findOne({'local.username': username}, function(err, user){
 if (err){
 return  done(err);
 }

 if (user){
 return done(null, false  ,req.flash('signupMessage', 'Email already used'));
 }

 else {
 var newUser = new User();
 newUser.local.username = username;
 newUser.local.password = password;

 newUser.save(function(err){
 if (err){
 throw err;
 }
 else {
 return done(null, newUser);
 }
 })
 }
 });
 // });


 */


/*

 passport.use('passportLocal', new passportLocal({
 usernameField: 'username',
 passwordField: 'password',
 passRequestToCallback: true
 },
 function(username, password, done) {

 //process.nextTick(function() {

 User.findOne({'local.username': username}, function (err, user) {
 if (err) {
 return done(err);
 }

 if (user) {
 return done(user);
 }

 else {
 var newUser = new User();
 newUser.local.username = username;
 newUser.local.password = password;
 newUser.save(function (err) {
 if (err) {
 throw err;
 }
 else {
 return done(null,newUser) ;
 }
 })
 }
 })
 //})
 }
 ))

 */