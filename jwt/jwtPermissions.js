var _ = require('lodash');


var checkPermissions = function (permissions) {

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

};

module.exports = checkPermissions;