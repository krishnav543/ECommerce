const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, deleteCategory} = require("../controllers/category");
const {isAuthenticated, isAdmin, isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById)

//actual routes
router.post("/category/create/:userId", isSignedIn, isAdmin, isAuthenticated, createCategory)
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);
router.put("/category/:categoryId/:userId", isAdmin, isSignedIn, isAuthenticated, updateCategory);
router.delete("/category/:categoryId/:userId", isAdmin, isAuthenticated, isSignedIn, deleteCategory)

module.exports = router;