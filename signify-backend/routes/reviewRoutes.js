const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController")

router.post('/email',reviewController.sendEmail)

module.exports = router;