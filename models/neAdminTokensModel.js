var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neAdminTokensSchema = new Schema({
    token: String,
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    createdAt:{type: String, required: true, default: new Date()}
});

var neAdminTokensModel = mongoose.model(
    'neadmintokens',
    neAdminTokensSchema
);


module.exports = neAdminTokensModel;