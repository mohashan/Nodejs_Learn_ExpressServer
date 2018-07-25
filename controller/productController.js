const product = require('../Model/product');
module.exports.add = function (req, res) {
    var newProduct = new product(req.body);
    if (!newProduct) {
        return res.status(400).send('product not found in request');
    }
    newProduct.save((err, pr) => {
        if (err) {
            return res.status(500).send('Can\'t insert product in db : '+ error);
        }
        return res.status(201).send(pr);
    });
};
