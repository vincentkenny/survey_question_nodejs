module.exports = (sequelize, DataTypes)=>{
    const Question = sequelize.define("Question",{
        questionText: {
            type : DataTypes.TEXT,
            allowNull: false
        },
        isAllowedNone:{
            type : DataTypes.INTEGER
        },
        isShuffleOrder:{
            type: DataTypes.INTEGER
        }
    });
    return Question;
};