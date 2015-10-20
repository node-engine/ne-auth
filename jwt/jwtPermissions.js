if (process.env.NE_AUTO) {
    var _ = require(process.env.NE_AUTO).lodash
}
else {
    var _ = require('lodash');
}


var checkPermissions = function (permissions) {

    return function (req, res, next) {
        var tokenPermissions = req.claims.permissions;
        var check = _.any(permissions, function (scope) {
            return _.contains(tokenPermissions, scope);
        });
        if(check){

            console.log('');
            console.log('');
            console.log('ne-auth jwtPermissions: check');
            console.log(check);
            console.log('');
            console.log('');

            next();
        }
        else{

            console.log('');
            console.log('');
            console.log('ne-auth jwtPermissions: check');
            console.log(check);
            console.log('');
            console.log('');

            res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
        }
    }
};

module.exports = checkPermissions;