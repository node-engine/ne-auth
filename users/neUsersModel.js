var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema;

var neUsersSchema = new Schema({
    profile: {
        name: {
            displayName: {type: String, required: true, default: "Unknown Person"},
            nameFirst: {type: String, default: undefined},
            nameLast: {type: String, default: undefined}
        },
        emails: [{type: String}],
        phones: [{type: String}]
    },
    detail: {
        type: Schema.ObjectId,
        ref: 'neusersdetail',
        default: undefined
    },
    permissions:[
        {type: String, default: "reader"}
    ],
    local: {
        active: {type: Boolean, default: false},
        email: {type: String, default: undefined},
        password: {type: String, default: undefined}
    },
    facebook: {
        active: {type: Boolean, default: false},
        id: {type: String},
        token: {type: String}
    },
    log: [
        {
            timeStamp:{type: String, default: new Date()},
            description:{type: String, default: "Not event description provided"}
        }
    ],
    createdAt:{type: String, required: true, default: new Date()}
});


// neUsersSchema.methods.generateContentAdminToken = function (){
//    var token = new Token();
// };

neUsersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

neUsersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var neUsersModel = mongoose.model(
    'neusers',
    neUsersSchema
);

exports.model = neUsersModel;