const express = require("express");
const { Question } = require("../../models");
const option = require("../../models/option");
const question = require("../../models/question");
const router = express.Router();
const db = require(__dirname + "/../../models");

const detailsController = require('../controller/details');

router.get("/", detailsController.details_get_all);

router.post("/", detailsController.details_create_question);

router.get("/:questionID", detailsController.details_get_question);

router.patch("/:questionID", detailsController.details_update_question);

router.delete("/:questionID", detailsController.details_delete_question);

module.exports = router;
