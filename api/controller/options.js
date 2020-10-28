const db = require(__dirname + "/../../models");

exports.options_get_all = (req, res, next) => {
    db.Option.findAll()
      .then((results) => {
        res.status(200).json({
          count: results.length,
          options: results.map((result) => {
            if (result.selectOptionMode == 0) modeMeaning = "May Select";
            else if (result.selectOptionMode == 1) modeMeaning = "Must Select";
            else if (result.selectOptionMode == 2)
              modeMeaning = "Terminate if Select";
            return {
              optionID: result.id,
              answerOption: result.answerOption,
              selectOptionMode: result.selectOptionMode,
              modeMeaning: modeMeaning,
              questionID: result.id_question,
            };
          }),
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Fetch option data failed",
        });
      });
  }

  exports.options_get_option = (req, res, next) => {
    db.Option.findByPk(req.params.optionID)
      .then((result) => {
        if (result.selectOptionMode == 0) modeMeaning = "May Select";
        else if (result.selectOptionMode == 1) modeMeaning = "Must Select";
        else if (result.selectOptionMode == 2)
          modeMeaning = "Terminate if Select";
        res.status(200).json({
          optionID: result.id,
          answerOption: result.answerOption,
          selectOptionMode: result.selectOptionMode,
          modeMeaning: modeMeaning,
          questionID: result.id_question,
        });
      })
      .catch(err=>{
          res.status(404).json({
              message: 'Option data not found!',
              url: 'http://localhost:3000/options'
          });
      });
  }

  exports.options_delete_option = (req,res,next)=>{
    db.Option.destroy({
        where:{
            id: req.params.questionID
        }
    }).then(result=>{
        res.status(204).json({
            message:'option deletion successful',
            url: 'http://localhost:3000/options'
        })
    }).catch(err=>{
        res.status(500).json({
            message: 'option deletion failed'
        })
    });
}