var neAuto;
if(process.env.NE_AUTO){
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var express = require(neAuto).express || require('express');

var logoutRoute = function (server, passport){

    var router = express.Router();

    router.get('/logout', function(req,res, next){

        res.clearCookie('token')
            .redirect('/');

    });

    server.use('/auth', router);

};

module.exports = logoutRoute;