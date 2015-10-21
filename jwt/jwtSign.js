var jwt = require('jsonwebtoken');

var jwtSign = function (user, tokenExpire){

    var expire = 3600000;
    if(tokenExpire){
        expire = tokenExpire
    }
    if(process.env.JWT_EXPIRE){
        expire = process.env.JWT_EXPIRE
    }

    var token = jwt.sign(
        {
            // payload goes here
            displayName: user.profile.name.displayName,
            user: user._id,
            permissions: user.permissions
        },
        process.env.JWT_SECRET,
        {
            expiresIn: expire
        }
    );
    return {
        token: token,
        expire: expire
    }

}

module.exports = jwtSign;