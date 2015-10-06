var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neEditorTokensSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    token: String,
    createdAt:{type: String, required: true, default: new Date()}
});

var neEditorTokensModel = mongoose.model(
    'needitortokens',
    neEditorTokensSchema
);

module.exports = neEditorTokensModel;