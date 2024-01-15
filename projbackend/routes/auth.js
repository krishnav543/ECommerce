const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {signout, signin, signup, isSignedIn} = require("../controllers/auth");

router.get("/signout", signout);
router.post("/signup", [
    check("name", "name should be atleast 3 chars").isLength({min:3}),
    check("email", "Email is required").isEmail(),
    check("password", "password should be atleast 3 chars").isLength({min: 3}),
], signup);

router.post("/signin",[
    check("email", "Email is required").isEmail(),
    check("password", "password is required").isLength({min: 3}),
], signin);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
})

module.exports = router;