const express = require("express");
const router = express.Router();

const questionsController = require('../controller/questions');

router.get("/", questionsController.questions_get_all);

router.post("/", questionsController.questions_create_question);

router.get("/:questionID", questionsController.questions_get_question);

router.patch("/:questionID", questionsController.questions_update_question);

router.delete("/:questionID", questionsController.questions_delete_question);

module.exports = router;
