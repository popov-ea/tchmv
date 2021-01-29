const express = require("express");
const router = express.Router();

router.use("/images", require("./imagesController"));
router.use("/users", require("./usersController"));
router.use("/dictionaries", require("./dictionariesController"));
router.use("/posts", require("./postsController"));
router.use("/dialogs", require("./dialogsController"));

module.exports = router;