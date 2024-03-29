const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
}, {timestamps: true});

module.exports = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {

    },
    amount: {
        type: Number
    },
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("OrderSchema", orderSchema);