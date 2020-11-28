const jwt = require("jsonwebtoken")
const config = require("../config/authConfig");
const db = require("../models");
const User = db.User;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({
            message: "No token provided"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unothorized"
            })
        }
        req.userId = decoded.id;
        next();
    })
};

const checkRole = (roleName, req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRole().then((role) => {
            if (role.name === roleName) {
                next();
                return;
            }
            return res.status(403).send({
                message: `Require ${roleName} role`
            });
        })
    })
};

const isAdmin = (req, res, next) => {
    checkRole("admin", req, res, next);
};

const isExpert = (req, res, next) => {
    checkRole("expert");
};

const authJwt = {
    verifyToken,
    isAdmin,
    isExpert
};

module.exports = authJwt;