module.exports = (sequelize, DataTypes)=>{
    const Option = sequelize.define("Option",{
        answerOption: {
            type : DataTypes.TEXT,
            allowNull: false
        },
        selectOptionMode:{
            type : DataTypes.INTEGER
        },
        QuestionID:{
            type: DataTypes.INTEGER
        }
    });
    return Option;
};