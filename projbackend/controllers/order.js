const {Order, ProductCart} = require("../models/order");
exports.getOrderById = (req, res, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec()
    .then((order) => {
        req.order = order;
    })
    .catch((err) => {
        res.status(400).json({
            error: "No order found in db"
        })
    })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(re.body.order)
    order.save()
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.status(400).json({
            error: "failedto save your order in db"
        })
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec()
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        return res.status(400).json({
            error: "No orders found in db"
        })
    })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }
            res.json(order);
        }
    )
}