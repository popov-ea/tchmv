const express = require("express");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const authConfig = require("../config/authConfig");
const authJwt = require("../middleware/authJwt");
const User = db.User;
const Role = db.Role;
const router = express.Router();

router.post("/new", [authJwt.verifyToken, authJwt.isAdmin] , (req, res) => {
    const userData = req.body;
    let role = userData.roleId && Role.findOne({
        where: {
            id: userData.roleId
        }
    });

    if (!role) {
        //res.status(400).send({message: "Incorrect role"});
        role = Role.findOne({
            where: {
                name: "competitor"
            }
        });
    }

    if (userData.email && userData.password) {
        User.create({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            country: userData.country,
            password: bcrypt.hashSync(userData.password)
        }).then((user) => {
            res.status(200).send({ user: user, message: "User was registered succesfully" });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        });
    }
});

router.post("/signin", (req, res) => {
    const signinData = req.body;
    if (!signinData.email || !signinData.password) {
        res.status(400).send({ message: "Incorrect data" });
        return;
    }

    User.findOne({
        where: {
            email: signinData.email
        },
        include: Role
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: "User not found" });
        }
        const isPasswordValid = bcrypt.compareSync(signinData.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400
        });

        res.status(200).json({
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleId: user.roleId,
                role: user.Role.name
            },
            accessToken: token
        });
    })
});

module.exports = router;