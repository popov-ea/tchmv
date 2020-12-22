const multer = require("multer");
const express = require("express");
const db = require("../models");
const Image = db.Image;
const User = db.User;
const nanoId = require("nanoid");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const { request, response } = require("express");
const authJwt = require("../middleware/authJwt");


router.use(multer({ storage: multer.memoryStorage() }).single("file"));

router.get("/", (request, response) => {
    const filePath = path.resolve("files/images/default.png");
    response.sendFile(filePath);
})

router.get("/:id", (request, response) => {
    const imageId = request.params.id;
    if (imageId) {
        Image.findOne({
            where: {
                id: imageId
            }
        }).then((image) => {
            const filePath = path.resolve("files/images/" + image ? image.path : "default.png");
            response.sendFile(filePath);
        });
    }
});

router.post("/for-user/:userId", authJwt.verifyToken, (request, response) => {
    if (!request.params.userId || !request.file) {
        return response.status(404);
    }
    const userId = request.params.userId;
    const type = request.file.mimetype.split("/")[1];
    const buffer = request.file.buffer;
    const filePath = nanoId.nanoid() + "." + type;
    let imageId;
    fs.writeFileSync("files/images/" + filePath, buffer);
    Image.create({ path: filePath })
        .then((img) => {
            imageId = img.id;
            return User.findOne({
                where: {
                    id: userId
                },
                include: Image
            });
        })
        .then((user) => {
            if (user.Image) {
                fs.unlinkSync(path.resolve("files/images/" + user.Image.path));
            }
            user.imageId = imageId;
            return user.save();x
        })
        .then(() => response.status(200).json({ photoId: imageId }))
        .catch(() => response.status(500));
});

router.delete("/for-user/:userId", authJwt.verifyToken, (request, response) => {
    User.findByPk(request.params.userId)
        .then((user) => {
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }
            if (user.imageId) {
                Image.findByPk(user.imageId)
                    .then((img) => {
                        fs.unlinkSync(path.resolve("files/images/" + img.path));
                        img.destroy();
                    });
                user.imageId = null;
                user.save();
                return response.status(200);
            }
        })
});

router.get("/for-user/:userId", (request, response) => {
    if (!request.params.userId) {
        return response.status(404);
    }

    User.findByPk(request.params.userId,
        {
            include: Image
        })
        .then((user) => {
            if (!user) {
                return response.status(404);
            }
            const fileName = (user.Image && user.Image.path) || "default.png";
            const filePath = path.resolve("files/images/" + fileName);
            response.sendFile(filePath);
        });
})

module.exports = router;