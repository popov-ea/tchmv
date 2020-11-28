const multer = require("multer");
const express = require("express");
const db = require("../models");
const Image = db.Image;
const User = db.User;
const nanoId = require("nanoid");
const path = require("path");
const router = express.Router();
const fs = require("fs");


router.use(multer({ storage: multer.memoryStorage() }).single("file"));

router.get("/:id", (request, response) => {
    const imageId = request.params.id || 1;
    if (imageId) {
        Image.findOne({
            where: {
                id: imageId
            }
        }).then((image) => {
            const filePath = path.resolve("files/images/" + image.path);
            response.sendFile(filePath);
        });
    }
});

router.post("/for-user/upload/:userId", (request, response) => {
    if (!request.params.userId || !request.file) {
        return;
    }
    const userId = request.params.userId;
    const type = request.file.mimetype.split("/")[1];
    const buffer = request.file.buffer;
    const path = nanoId.nanoid() + "." + type;
    let imageId;
    fs.writeFileSync("files/images/" + path, buffer);
    Image.create({ path: path })
        .then((img) => {
            imageId = img.id;
            return User.findOne({
                where: {
                    id: userId
                }
            });
        })
        .then((user) => {
            user.imageId = imageId;
            return user.save();
        })
        .then(() => response.status(200).json({ photoId: imageId }))
        .catch(() => response.status(500));
})

module.exports = router;