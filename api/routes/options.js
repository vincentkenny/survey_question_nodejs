const express = require("express");
const router = express.Router();

const optionsController = require('../controller/options');

router.get("/", optionsController.options_get_all );


router.get("/:optionID", optionsController.options_get_option);


router.delete("/:questionID", optionsController.options_delete_option);

module.exports = router;
