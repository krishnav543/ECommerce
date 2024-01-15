const user = require("../models/user");
const User = require("../models/user");
const {validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt} = require("express-jwt");


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "USer signout successful"
    })
}

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body)
    // user.save((err, user) => {
    //     if (err) {
    //         return res.status(400).json({
    //             err: "Not able to save user in DB"
    //         })
    //     }
        
    // });
    user.save()
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save to db"
            })
        }
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    // User.findOne({email}, (err, user) => {
    //     if (err) {
    //         res.status(400).json({
    //             err: "USER EMAIL DOES NOT EXISTS"
    //         });
    //     }
    //     if (!user.authenticate(password)) {
    //         return res.status(401).json({
    //             err: "Email and password do not match"
    //         })
    //     }
    //     //Create token
    //     const token = jwt.sign({_id: user._id}, process.env.SECRET);

    //     //put token in cookie
    //     res.cookie("token", token, {expire: new Date() + 9999});

    //     //Send response to front end
    //     const {_id, name, password, role} = user;
    //     return res.json({
    //         token,
    //         user: {
    //             _id, name, email, role
    //         }
    //     })
    // })

    User.findOne({email})
    .then((user) => {
        // if (err) {
        //     res.status(400).json({
        //         err: "USER EMAIL DOES NOT EXISTS"
        //     });
        // }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                err: "Email and password do not match"
            })
        }
        //Create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //Send response to front end
        const {_id, name, password, role} = user;
        return res.json({
            token,
            user: {
                _id, name, email, role
            }
        })
    }).catch((err) => {
            res.status(400).json({
                err: "USER EMAIL DOES NOT EXISTS"
            });
    })
}

//protected routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});
//Custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ASSESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }

    next();
};