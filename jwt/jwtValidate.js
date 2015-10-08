var expressJwt = require('express-jwt');

var jwtValidate = function (){

    return expressJwt({
        secret: process.env.JWT_SECRET,
        requestProperty: 'claims',
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            }
            else if (req.query && req.query.token) {
                return req.query.token;
            }
            else if (req.cookies && req.cookies.token) {
                return req.cookies.token;
            }
            return null;
        }
    })
};

module.exports = jwtValidate;