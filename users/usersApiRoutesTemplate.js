if (process.env.NE_AUTO) {
    var stringify = require(process.env.NE_AUTO).stringifyObject;
}
else {
    var stringify = require ('stringify-object');
}

var validateToken = require('../jwt/jwtValidate');
var checkPermissions = require('../jwt/jwtPermissions');
var checkPermissionsReturn = require('../jwt/jwtPermissionsReturn');

var baseRoutes =  function (router, model, permissionsArray, populatePath){

    router.use('/:_id', function(req, res, next) {

        if (req.claims && req.claims.user === req.params._id ){
            next();
        }
        else if(checkPermissionsReturn( permissionsArray, req) === true) {
            next();
        }
        else {

            console.log('');
            console.log('');
            console.log('ne-auth usersApiRoutesTemplate: Access Denied');
            console.log('req.claims');
            console.log(req.claims);
            console.log('req.params._id');
            console.log(req.params._id);
            console.log('');
            console.log('');

            res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
        }

    });

    router.get('/', function(req, res){

        if(checkPermissionsReturn( permissionsArray, req) === true) {
            model
                .find()
                .populate(
                {path: populatePath}
            )
                .exec(function (err, doc) {
                    res.send(doc);
                });
        }
        else{

            console.log('');
            console.log('');
            console.log('ne-auth usersApiRoutesTemplate: Access Denied');
            console.log('Required Permissions (permissionsArray)');
            console.log(permissionsArray);
            console.log('req.claims');
            console.log(req.claims);
            console.log('');
            console.log('');

        }

    });

    router.get('/:_id', function(req, res){

        var f1 = '_id';
        var v1 = req.params._id;
        var q1 = {};
        q1[f1] = v1;

        model
            .find(
            q1
        )
            .sort(
            {_id: 1}
        )
            .skip(
            req.query.limit * req.query.batch
        )
            .limit(
            req.query.limit
        )
            .populate(
            {path: populatePath}
        )
            .exec(function (err, doc) {

                res.send(doc);
            })

    });

    router.put('/:_id', function(req, res){

        var f1 = '_id';
        var v1 = req.params._id;
        var q1 = {};
        q1[f1] = v1;

        var config = {};
        config['multi'] = false;
        if (req.query.multi){
            config['multi'] = true;
        }


        console.log("--------------------");
        console.log("Put request received");

        var json = req.body;

        if (Object.keys(json).length === 0){
            console.log("No JSON request body found");
            console.log("Trying to use query params");

            var fs1 = req.query.fs1;
            var vs1 = req.query.vs1;
            var s1 = {};
            s1[fs1] = vs1;

            // Log
            var logItem = {
                description: fs1 + " changed to " + vs1
            }

            if (fs1 != null && vs1 != null) {
                model
                    .update(
                    q1,
                    {
                        $set: s1,
                        $push: { "log": logItem }
                    },
                    config
                )
                    .exec(function (err, doc){
                        res.send(doc);
                    });
                console.log("Put request executed using query params");
                console.log("--------------------");
            }
            else if (fs1 != null ){
                var msg = "ERROR: No fs1 query param specified";
                console.error(msg);
                res.send(msg);
                console.log("--------------------");
            }
            else if (vs1 != null ){
                var msg = "ERROR: No vs1 query param specified";
                console.error(msg);
                res.send(msg);
                console.log("--------------------");
            }

        }
        else if (Object.keys(json).length !== 0) {
            console.log("JSON request body object found");

            var jsonString = stringify(json, {
                indent: '  ',
                singleQuotes: false
            });

            // Log
            var logItem = {
                description: "json used to update: " + jsonString
            }

            model
                .update(
                q1,
                {
                    $set: json,
                    $push: { "log": logItem }
                },
                config
            )
                .exec(function (err, doc){
                    res.send(doc);
                });
            console.log("Put request executed using JSON request body object");
            console.log("--------------------");

        }
        else {
            var msg = "ERROR: Unknown reason";
            console.error(msg);
            res.send(msg);
            console.log("--------------------");
        }

    });

    router.delete('/:_id', function(req, res){

        var f1 = '_id';
        var v1 = req.params._id;
        var q1 = {};
        q1[f1] = v1;

        if (v1 != null) {
            model
                .remove(
                q1
            )
                .exec(function (err, doc){
                    if (err) return console.error(err);
                    res.send(f1 + ': ' + v1 + ' removed ' + doc);
                })
        }
        else {
            console.log('Please specify a valid field value pair to find the item you want to delete')
        }

    });

    router.post('/', function(req, res){

        if(checkPermissionsReturn( permissionsArray, req) === true) {

            var obj = req.body;

            var newDoc = new model(obj);
            newDoc.save(function (err, newDoc){
                if (err) return console.error(err);
                res.send(newDoc)
            })

        }
        else{

            console.log('');
            console.log('');
            console.log('ne-auth usersApiRoutesTemplate: Access Denied');
            console.log('Required Permissions (permissionsArray)');
            console.log(permissionsArray);
            console.log('req.claims');
            console.log(req.claims);
            console.log('');
            console.log('');

        }
    });

    return router
};

module.exports = baseRoutes;




/*
 var reqPermissionsArray = []

 console.log('');
 console.log('');
 console.log('ne-auth usersApiRoutesTemplate: req.claims');
 console.log(req.claims);
 console.log('');
 console.log('');

 var userId = req.claims.user;

 console.log('');
 console.log('');
 console.log('ne-auth usersApiRoutesTemplate: permissionsArray to allow before user push');
 console.log(reqPermissionsArray);
 console.log('');
 console.log('');

 reqPermissionsArray.push(userId);

 console.log('');
 console.log('');
 console.log('ne-auth usersApiRoutesTemplate: permissionsArray to allow before permission push');
 console.log(reqPermissionsArray);
 console.log('');
 console.log('');

 reqPermissionsArray.push(permission);

 console.log('');
 console.log('');
 console.log('ne-auth usersApiRoutesTemplate: permissionsArray to allow');
 console.log(reqPermissionsArray);
 console.log('');
 console.log('');
 */