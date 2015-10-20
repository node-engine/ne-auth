if (process.env.NE_AUTO) {
    var _ = require(process.env.NE_AUTO).lodash
}
else {
    var _ = require('lodash');
}

var checkPermissionsReturn = function (permissions, req) {

    console.log('')
    console.log('')
    console.log('ne-auth jwtPermissionsReturn: Permissions of current user (req.claims.permissions)')
    console.log(req.claims.permissions)
    console.log('')
    console.log('')

    var tokenPermissions = req.claims.permissions;
    var check = _.any(permissions, function (scope) {
        return _.contains(tokenPermissions, scope);
    });
    if(check){

        console.log('')
        console.log('')
        console.log('ne-auth jwtPermissionsReturn: check')
        console.log(check)
        console.log('')
        console.log('')

        return true
    }
    else{

        console.log('')
        console.log('')
        console.log('ne-auth jwtPermissionsReturn: check')
        console.log(check)
        console.log('')
        console.log('')

        return false
    }

};

module.exports = checkPermissionsReturn;