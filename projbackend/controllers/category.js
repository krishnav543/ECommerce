// const category = require("../models/category");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec()
    .then((cate) => {
        req.category = cate;
        next();
    })
    .catch((err) => {
        return res.status(400).json({error: "Category not found"});
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save()
    .then((category) => {
        res.json({category})
    })
    .catch((err) => {
        return res.status(400).json({
            errror: "Not able to save category",
            err
        })
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}


exports.getAllCategories = (req, res) => {
    Category.find().exec()
    .then((categories) => {
        res.json(categories);
    })  
    .catch((err) => {
        return res.status(400).json({
            error: "No categories foind"
        })
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save()
    .then((updatedCategory) => {
        res.json(updatedCategory)
    })
    .catch((err) => {
        return res.status(400).json({
            error: "Failed to update category"
        })
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;

    category.remove()
    .then((category) => {
        res.json({
            message: "Successfullay deleted"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            error: "Failed to delete category"
        })
    })
}