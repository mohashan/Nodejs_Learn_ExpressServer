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
            if (err || !pr) {
                return res.status(404).send('product not found');
            }
            return res.status(200).json(pr);
        });
    } else {
        product.find((err, prs) => {
            if (err || !prs || prs.length < 1) {
                return res.status(404).send('products not found');
            }
            res.setHeader('x-product-count', prs.length);
            return res.status(200).json(prs);
        });
    }
};

module.exports.updatePatch = (req, res) => {
    if (!req.query || !req.query.id) {
        return res.status(400).send('product id must be specified');
    }
    var newProduct = req.body;
    if (!newProduct) {
        return res.status(400).send('product fields to update must be specified');
    }
    Object.assign(newProduct, {
        lastModified: new Date()
    });
    product.findByIdAndUpdate(req.query.id, {
        $set: newProduct
    }, (err, product) => {
        if (err) {
            return res.status(500).send('Update Failed : ' + err);
        }
        res.setHeader('x-item', req.url);
        return res.status(204).json(product);
    });

};

module.exports.updatePut = (req, res) => {
    if (!req.query || !req.query.id) {
        return res.status(400).send('product id must be specified');
    }
    var newProduct = req.body;
    if (!newProduct) {
        return res.status(400).send('product fields to update must be specified');
    }

    Object.assign(newProduct, {
        lastModified: new Date()
    });
    product.findByIdAndUpdate(req.query.id, newProduct, {
        upsert: true
    }, (err, product) => {
        if (err) {
            return res.status(500).send('Update Failed : ' + err);
        }
        res.setHeader('x-item', req.url);
        return res.status(204).json(product);
    });

};

module.exports.delete = function (req, res) {
    if (req.query && req.query.id) {
        product.findByIdAndRemove(req.query.id, (err, pr) => {
            if (err) {
                return res.status(404).send('product not found');
            }
            return res.status(204).json(pr);
        });
    } else {
        return res.status(404).send('product id must be specified.');
    }
};