const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec()
    .then((product) => {
        req.product = product;
        next();
    })
    .catch((err) => {
        res.status(400).json({
            error: "Product not ound"
        })
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({
                error: "Problem with Image"
            });
        }

        //destructure the fields
        const {price, name, description, category, stock } = fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all fields"
            })            
        }

        let product = new Product(fields)

        //handle file
        if (files.photo) {
            if (files.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type;
        }
        //save to db
        product.save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(400).json({
                error: "Saving T shirt in db failed"
            })
        })

    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove()
    .then((deletedProduct) => {
        res.json({
            message: "Deletion success"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            error: "Failed to delte the product"
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({
                error: "Problem with Image"
            });
        }

   
        //updation 
        let product = req.product;
        product = _.extend(product, fields)

        //handle file
        if (files.photo) {
            if (files.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type;
        }
        //save to db
        product.save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(400).json({
                error: "Updating T shirt in db failed"
            })
        })

    })
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; 

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec()
    .then((products) => {
        res.json(products)
    })
    .catch((err) => {
        res.status(400).json({
            error: "No product found"
        })
    })
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +product.count}}
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found"
            })
        }
        res.json(category);
    })
}