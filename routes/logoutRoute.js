if (process.env.NE_AUTO) {
    var express = require(process.env.NE_AUTO).express;
}
else {
    var express = require('express');
}

var logoutRoute = function (server, passport){

    var router = express.Router();

    router.get('/logout', function(req,res, next){

        res.clearCookie('token')
            .redirect('/');

    });

    server.use('/auth', router);

};

module.exports = logoutRoute;