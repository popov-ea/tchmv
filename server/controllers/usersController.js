const express = require("express");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const authJwt = require("../middleware/authJwt");
const User = db.User;
const Role = db.Role;
const router = express.Router();

router.post("/new", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    const userData = req.body;
    if (!userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.password || userData.roleId == null) {
        res.status(405).json({ message: "Invalid data" });
    }
    User.findOne({
        where: {
            email: userData.email
        }
    }).then((user) => {
        if (user) {
            res.status(405).json({ message: `User with email ${userData.email} already exists` });
            return;
        }
        Role.findOne({
            where: {
                id: userData.roleId
            }
        }).then((role) => {
            if (!role) {
                res.status(405).json({ message: "Role doesn't exist" });
                return;
            }
            if (userData.email && userData.password) {
                User.create({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    country: userData.country,
                    password: bcrypt.hashSync(userData.password),
                    roleId: role.id
                }).then((user) => {
                    res.status(200).send({ user: user, message: "User was registered succesfully" });
                }).catch((err) => {
                    res.status(500).send({ message: err.message });
                });
            }
        });
    })

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
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleId: user.roleId,
                role: user.Role && user.Role.name
            },
            accessToken: token
        });
    })
});

router.get("/info/:id", authJwt.verifyToken, (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            country: user.country,
            about: user.about,
            pin: user.pin
        });
    })
});

router.post("/info/:id", authJwt.verifyToken, (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).json({ mesage: "user not found" });
        }
        const userInfo = req.body;
        if (!userInfo.firstName || !userInfo.lastName) {
            return res.status(405).json({ message: "invalid form" });
        }

        user.firstName = userInfo.firstName;
        user.lastName = userInfo.lastName;
        user.country = userInfo.country;
        user.about = userInfo.about;

        user.save().then((user) => {
            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                country: user.country,
                about: user.about
            });
        });
    });
});

router.get("/roles", (req, res) => {
    Role.findAll().then((roles) => {
        res.json(roles.map((r) => ({ id: r.id, name: r.name })));
    });
});

router.post("/change-password", authJwt.verifyToken, (req, res) => {
    const isValid = req.body.oldPassword 
                    && req.body.newPassword 
                    && req.body.passwordConfirmation 
                    && req.body.newPassword === req.body.passwordConfirmation;
    if (!isValid) {
        res.status(405).json({message: "Invalid form"});
    }
    User.findByPk(req.userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({mmessage: "User not found"});
                return;
            }
            user.password = bcrypt.hashSync(req.body.newPassword);
            user.save();
            res.status(200).json({message: "Passsword updated"});
        })
        .catch(() => res.status(500).json({message: "Internal server error"}));
});

router.put("/pin", authJwt.verifyToken, (req, res) => {
    if (req.body.pin == null || isNaN(req.body.pin)) {
        res.status(405).json({message: "Invalid PIN"});
        return;
    }

    User.findByPk(req.userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "User not found"});
                return;
            }
            user.pin = req.body.pin;
            user.save();
            res.status(200).json({message: "Pin updated"});
        });
})

module.exports = router;