var express = require('express');

var router = express.Router();

var routes = function (server){

    router.post('/super', function(req,res, next){

        var neSuperToken = process.env.NE_SUPER_TOKEN;
        var neSuper = req.body.token;

        if (neSuperToken === neSuper){

            neUsersModel.findOne({"_id": req.body._id}, function (err, user) {
                if (err) {
                    console.log("neAuth makeAdminWithSuperRoute: Unknown error");
                    return res.redirect("/login")
                }
                if (!user) {
                    console.log("neAuth makeAdminWithSuperRoute: Can not match username");
                    return res.redirect("/login");
                }
                if (user){

                    console.log("neAuth makeAdminWithSuperRoute: Successfully authenticated");

                    user.permissions.push("admin");

                    user.save(function(err) {
                        if (err){
                            console.log(err);
                        }

                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");
                        console.log("Made new admin user");
                        console.log(user);
                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");
                        console.log("==================================");

                        return res.redirect("/login");
                    });

                }
                var validPassword = function (password) {
                    if (user.validPassword(password)) {

                    }
                    else {
                        console.log("neAuth makeAdminWithSuperRoute: Password incorrect");
                        return res.redirect("/login")
                    }
                };
                validPassword(password)

            });

        }

    });

    server.use('/auth', router);

};

module.exports = routes;