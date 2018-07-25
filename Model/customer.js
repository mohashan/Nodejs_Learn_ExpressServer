const mongoose = require('mongoose');
mongoose.createConnection(require('../Model/config').mongodb);

import { productSchema } from './product';
var schema = mongoose.Schema;
var customerSchema = new schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    age: {
        type: Number,
        min: 0,
        max: 200,
        required: true
    },
    isMan: {
        type: Boolean,
        required: true,
        default: true
    },
    products: {
        type:[productSchema],
    }
});
module.exports = mongoose.model('customer', customerSchema);
