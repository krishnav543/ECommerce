const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);


router.post("/product/create/:userId", isSignedIn, isAdmin, isAuthenticated, createProduct);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete("/product/:productId/:userId", isAuthenticated, isSignedIn, isAdmin, deleteProduct);
//update route
router.put("/product/:productId/:userId", isAuthenticated, isSignedIn, isAdmin, updateProduct);


//listing route
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;