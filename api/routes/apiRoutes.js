const express = require("express");
const option = require("../../models/option");
const router = express.Router();
const db = require(__dirname + "/../../models");

router.get("/", (req, res, next) => {
  db.Question.findAll().then((question_results) => {
    db.Option.findAll().then((option_results) => {
      res.render("home", { question: question_results, option: option_results });
    });
  });
});

router.post('/',(req,res,next)=>{
    const allowNone = req.body.isAllowed || 0;
    const shuffleOrder = req.body.isShuffled || 0;
    db.Question.create({
        questionText: req.body.question,
        isAllowedNone: allowNone,
        isShuffleOrder: shuffleOrder
    }).then(result=>{
        questionID = result.id;
        idxOption = 0;
        while(typeof req.body['answerOption'+idxOption] !== 'undefined'){
            db.Option.create({
                answerOption: req.body['answerOption'+idxOption],
                
            })
        }
        // if(typeof req.body['answerOption'+ idxOption]!== 'undefined'){
        //     res.json({message: req.body['answerOption'+ idxOption]});
        // }else{
        //     res.json({message:'undefined'});
        // }
    });
});

module.exports = router;
