const express = require("express");
const db = require("../models");
const nanoId = require("nanoid");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const authJwt = require("../middleware/authJwt");
const PostFound = db.PostFound;
const PostLost = db.PostLost;
const Image = db.Image;
const User = db.User;
const { Op } = require("sequelize");

const router = express.Router();

router.use(multer({ storage: multer.memoryStorage() }).array("files"));

router.post("/", authJwt.verifyToken, (request, response) => {
    const postInfo = request.body;

    if (!postInfo.name || !postInfo.city || !postInfo.species) {
        return response.status(400);
    }

    const post = {
        name: postInfo.name,
        description: postInfo.description,
        cityId: postInfo.city,
        districtId: postInfo.district,
        speciesId: postInfo.species,
        breedId: postInfo.breedId,
        genderId: postInfo.gender
    };

    if (request.body.postType === "found" ) {
        PostFound.create(post).then((post) => response.json(post));
    } else {
        PostLost.create(post).then((post) => response.json(post));
    }
});

module.exports = router;