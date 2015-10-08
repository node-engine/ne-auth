var validateToken = require('./jwt/jwtValidate');
var checkPermissions = require('./jwt/jwtPermissions');

var baseRoutes =  function (router, model, permissionsArray, populatePath){

    router.get('/',

        validateToken(), checkPermissions(permissionsArray),

        function(req, res){

            model
                .find()
                .populate(
                {path: populatePath}
            )
                .exec(function (err, doc) {
                    res.send(doc);
                });

        });

    router.get('/:_id',

        validateToken(), checkPermissions(permissionsArray),

        function(req, res){

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

    router.put('/:_id',

        validateToken(), checkPermissions(permissionsArray),

        function(req, res){

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

                if (fs1 != null && vs1 != null) {
                    model
                        .update(
                        q1,
                        {
                            $set: s1
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

                model
                    .update(
                    q1,
                    {
                        $set: json
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

    router.delete('/:_id',

        validateToken(), checkPermissions(permissionsArray),

        function(req, res){

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

    router.post('/',

        validateToken(), checkPermissions(permissionsArray),

        function(req, res){

            var obj = req.body;

            var newDoc = new model(obj);
            newDoc.save(function (err, newDoc){
                if (err) return console.error(err);
                res.send(newDoc)
            })

        });

    return router
};

module.exports = baseRoutes;