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
const City = db.City;
const User = db.User;
const District = db.District;
const Breed = db.Breed;
const Species = db.Species;
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

    if (request.body.postType === "found") {
        PostFound.create(post).then((post) => response.json(post));
    } else {
        PostLost.create(post).then((post) => response.json(post));
    }
});

const getPosts = (params) => {
    const start = parseInt(params.start >= 0 ? params.start : 0);
    const end = parseInt(params.end >= start ? params.end : start);
    const withClosed = params.withClosed;

    let type = ["lost", "found", "all"].find(x => x === params);
    if (!type) {
        type = "all";
        //return response.status(405).message("Request must include parameters \"type\" which can be one of: all, found, lost");
    }

    const query = withClosed
        ? {
            where: {
                closed: {
                    [Op.or]: [false, null]
                }
            }
        }
        : {};

    let promise;

    switch (type) {
        case "lost":
            promise = PostLost.findAll(query);
            break;
        case "found":
            promise = PostFound.findAll(query);
            break;
        case "all":
            promise = Promise.all([PostFound.findAll({ ...query, include: [City, Image, District, Species, Breed] }),
            PostLost.findAll({ ...query, include: [Breed, City, Image, District, Species,] })])
                .then(([found, lost]) => {
                    found = found.map(f => {
                        return { id: f.id, name: f.name, description: f.description, city: f.City, district: f.District, type: "found", species: f.Species, breed: f.Breed, createdAt: f.createdAt, images: f.Images };
                    });
                    lost = lost.map(l => {
                        return { id: l.id, name: l.name, description: l.description, city: l.City, district: l.District, type: "lost", species: l.Species, breed: l.Breed, createdAt: l.createdAt, images: l.Images };
                    });
                    return found.concat(lost);
                })
            break;
    }

    promise.then((posts) => posts.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    }))
        .then((sortedPosts) => {
            return sortedPosts.slice(start, sortedPosts.length > end ? end : sortedPosts.length)
        });

    return promise;
}

router.get("/count", (request, response) => {
    getPosts(request.query)
        .then((posts) => response.json(posts.length));
})

router.get("/", (request, response) => {
    getPosts(request.query)
        .then((posts) => response.json(posts));
})

router.get("/:type/:postId", (request, responses) => {
    const type = ["lost", "found"].find(x => x === request.params.type);
    const postId = request.params.postId;
    if (!type || !postId || typeof postId !== "number") {
        return response.status(400);
    }
    const postFound = (post) => {
        if (!post) {
            return response.status(400)
        }
        return
    }
    switch (type) {
        case "lost":
            PostLost.findByPk().then(postFound)
    }
})

module.exports = router;