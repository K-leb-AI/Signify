const express = require("express");
const router = express.Router();
const translationLogController = require("../controller/translationLogController")

router.route("/").get(translationLogController.getTranslationLog).post(translationLogController.postTranslationLog);
router.route("/:id").delete(translationLogController.deleteTranslationLog);

module.exports = router;