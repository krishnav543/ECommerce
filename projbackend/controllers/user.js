const User = require("../models/user");
const order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec().then((user) =>{
        req.profile = user;
        next();
    }).catch((err) =>{
        if (err || !user) {
            res.status(400).json({
                error: "No user found in db"
            })
        }
    })
    // (err, user) => {
    //     if (err || !user) {
    //         res.status(400).json({
    //             error: "No user found in db"
    //         })
    //     }
    //     req.profile = user;
    //     next();
    // }

}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},

    ).then((user) => {
        user.salt = undefined;
        user.encry_password = undefined;
        return res.json(user);
    })
    .catch((err) =>{
        if(err){
            return res.status(400).json({
                error: "You are not authorized to update this info"
            })
        }
    })
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec()
    .then((order) => {
        return res.json(order)
    })
    .catch((err) => {
        return res.status(400).json({
            error: "NO order in this account"
        })
    })
}

exports.pushOrderInPurchaseList = (req, res, next) =>{
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},

    ).then((purchase) => {
        next();
    }).catch((err) => {
        return res.status(400).json({
            error: "Unable to sva epurchase list"
        })
    })



}