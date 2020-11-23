const express = require("express");
const router = express.Router();

router.use("/images", require("./imagesController"));
router.use("/users", require("./usersController"));

module.exports = router;