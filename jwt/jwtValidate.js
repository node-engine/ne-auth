var neAuto;
if(process.env.NE_AUTO){
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var expressJwt = require(neAuto).expressJwt || require('express-jwt');

var jwtValidate = function (){

    return expressJwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false,
        requestProperty: 'claims',
        getToken: function fromHeaderOrQuerystring(req) {

            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

                console.log('');
                console.log('');
                console.log('ne-auth jwtValidate: req.headers.authorization');
                console.log('');
                console.log('');

                return req.headers.authorization.split(' ')[1];
            }
            else if (req.query && req.query.token) {

                console.log('');
                console.log('');
                console.log('ne-auth jwtValidate: req.query.token');
                console.log('');
                console.log('');

                return req.query.token;
            }
            else if (req.cookies && req.cookies.token) {

                console.log('');
                console.log('');
                console.log('ne-auth jwtValidate: req.cookies.token');
                console.log('');
                console.log('');

                return req.cookies.token;
            }

            console.log('');
            console.log('');
            console.log('ne-auth jwtValidate: not validated');
            console.log('');
            console.log('');

            return "somebogustoken";
        }
    })
};

module.exports = jwtValidate;
