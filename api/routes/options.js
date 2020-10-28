const express = require("express");
const { Question } = require("../../models");
const option = require("../../models/option");
const question = require("../../models/question");
const router = express.Router();
const db = require(__dirname + "/../../models");

const optionsController = require('../controller/options');

router.get("/", optionsController.options_get_all );


router.get("/:optionID", optionsController.options_get_option);


router.delete("/:questionID", optionsController.options_delete_option);

module.exports = router;
