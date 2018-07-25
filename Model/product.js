const mongoose = require('mongoose');
mongoose.connect(require('../Model/config').mongodb);

var schema = mongoose.Schema;
var productSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    count: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    insertDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose.model('product', productSchema);