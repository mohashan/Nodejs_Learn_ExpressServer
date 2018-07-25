const product = require('../Model/product');
module.exports.add = function (req, res) {
    var newProduct = new product(req.body);
    if (!newProduct) {
        return res.status(400).send('product not found in request');
    }
    newProduct.save((err, pr) => {
        if (err) {
            return res.status(500).send('Can\'t insert product in db : ' + error);
        }
        res.setHeader('x-productId', pr.id);
        return res.status(201).send(pr);
    });
};

module.exports.get = function (req, res) {
    var condition = {};
    if (req.query && req.query.id) {
        product.findById(req.query.id, (err, pr) => {
            if (err) {
                return res.status(404).send('product not found');
            }
            return res.status(200).json(pr);
        });
    } else {
        product.find((err, prs) => {
            if (err) {
                return res.status(404).send('products not found');
            }
            res.setHeader('x-product-count', prs.length);
            return res.status(200).json(prs);
        });
    }
};