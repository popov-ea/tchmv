const { request } = require("express");
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:id", (request, response) => {
    //TODO: Image info with image extension from db
    const imageId = request.params.id || 1;
    if (imageId) {
        response.sendFile(path.resolve("files/images/" + imageId + ".png"));
    }
});

module.exports = router;