var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neReaderTokensSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    token: String,
    createdAt:{type: String, required: true, default: new Date()}
});

var neReaderTokensModel = mongoose.model(
    'nereadertokens',
    neReaderTokensSchema
);

module.exports = neReaderTokensModel;