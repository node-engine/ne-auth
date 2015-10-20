var neAuto;
if(process.env.NE_AUTO){
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var jwt = require(neAuto).jsonwebtoken || require('jsonwebtoken');

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