const db = require(__dirname + "/../../models");

exports.questions_get_all = (req, res, next) => {
  db.Question.findAll({
    include: ["Options"],
  })
    .then((results) => {
      res.status(200).json({
        count: results.length,
        results: results.map((result) => {
          return {
            question_id: result.id,
            questionText: result.questionText,
            isNoneOfTheAboveAllowed: result.isAllowedNone,
            isShuffleOrder: result.isShuffleOrder,
            options: result.Options.map((option) => {
              if (option.selectOptionMode == 0)
                optionModeMeaning = "May Select";
              else if (option.selectOptionMode == 1)
                optionModeMeaning = "Must Select";
              else if (option.selectOptionMode == 2)
                optionModeMeaning = "Terminate if Select";
              return {
                answer_id: option.id,
                answerText: option.answerOption,
                selectOptionMode: option.selectOptionMode,
                optionModeMeaning: optionModeMeaning,
              };
            }),
          };
        }),
        url: "http://localhost:3000/questions/{QuestionID}",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to fetch data",
      });
    });
};

exports.questions_create_question = (req, res, next) => {
  const allowNone = req.body.isAllowed || 0;
  const shuffleOrder = req.body.isShuffled || 0;
  db.Question.create({
    questionText: req.body.question,
    isAllowedNone: allowNone,
    isShuffleOrder: shuffleOrder,
  })
    .then((result) => {
      questionID = result.id;
      var idxOption = 0;
      while (typeof req.body["answerOption" + idxOption] !== "undefined") {
        db.Option.create({
          answerOption: req.body["answerOption" + idxOption],
          selectOptionMode: req.body["selectOptionMode" + idxOption],
          QuestionId: questionID,
        })
          .then((opt_res) => {
            // console.log(opt_res);
          })
          .catch((err) => {
            res.status(500).json({
              message: "Option write unsuccessful",
              url: "http://localhost:3000/questions",
            });
          });
        idxOption += 1;
      }
      res.status(201).json({ message: "Input success"});
    })
    .catch((err) => {
      res.status(500).json({
        message: "Question write unsuccessful",
      });
    });
};

exports.questions_get_question = (req, res, next) => {
    db.Question.findByPk(req.params.questionID, {
      include: ["Options"],
    })
      .then((result) => {
        res.status(200).json({
          question_id: result.id,
          questionText: result.questionText,
          isNoneOfTheAboveAllowed: result.isAllowedNone,
          isShuffleOrder: result.isShuffleOrder,
          options: result.Options.map((option) => {
            if (option.selectOptionMode == 0) optionModeMeaning = "May Select";
            else if (option.selectOptionMode == 1)
              optionModeMeaning = "Must Select";
            else if (option.selectOptionMode == 2)
              optionModeMeaning = "Terminate if Select";
            return {
              answer_id: option.id,
              answerText: option.answerOption,
              selectOptionMode: option.selectOptionMode,
              optionModeMeaning: optionModeMeaning,
            };
          }),
          url: "http://localhost:3000/questions/",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Data not found",
          url: "http://localhost:3000/questions/"
        });
      });
  }

  exports.questions_update_question = (req, res, next) => {
    const allowNone = req.body.isAllowed || 0;
    const shuffleOrder = req.body.isShuffled || 0;
    //updating Question
    db.Question.update(
      {
        questionText: req.body.question,
        isAllowedNone: allowNone,
        isShuffleOrder: shuffleOrder,
      },
      {
        where: {
          id: req.params.questionID,
        },
      }
    )
      .then((question_result) => {
        //getting related options and sorting
        db.Option.findAll({
          where: {
            QuestionId: req.params.questionID,
          },
          order: [["id", "ASC"]],
        }).then((option_results) => {
          //updating the options 1by1
          for (var i = 0; i < option_results.length; i++) {
            db.Option.update(
              {
                answerOption: req.body["answerOption" + i],
                selectOptionMode: req.body["selectOptionMode" + i],
              },
              {
                where: {
                  id: option_results[i].id,
                },
              }
            );
          }
  
          db.Question.findByPk(req.params.questionID, {
            include: ["Options"],
          })
            .then((result) => {
              res.status(204).json({
                question_id: result.id,
                questionText: result.questionText,
                isNoneOfTheAboveAllowed: result.isAllowedNone,
                isShuffleOrder: result.isShuffleOrder,
                options: result.Options.map((option) => {
                  if (option.selectOptionMode == 0)
                    optionModeMeaning = "May Select";
                  else if (option.selectOptionMode == 1)
                    optionModeMeaning = "Must Select";
                  else if (option.selectOptionMode == 2)
                    optionModeMeaning = "Terminate if Select";
                  return {
                    answerText: option.answerOption,
                    selectOptionMode: option.selectOptionMode,
                    optionModeMeaning: optionModeMeaning,
                  };
                }),
                url: "http://localhost:3000/questions/",
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Couldn't update options data",
              });
            });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Couldn't update questions data",
        });
      });
  }

  exports.questions_delete_question = (req, res, next) => {
    db.Option.destroy({
      where: {
        QuestionId: req.params.questionID,
      },
    }).then(() => {
      db.Question.destroy({
        where: {
          id: req.params.questionID,
        },
      })
        .then((result) => {
          res.status(204).json({
            message: "Deletion Successful",
            url: "http://localhost:3000/questions",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Question deletion unsuccessful",
          });
        });
    });
  }