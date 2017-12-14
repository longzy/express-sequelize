"use strict";

module.exports = function(sequelize, DataTypes){

    var Retain = sequelize.define('Retain', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: DataTypes.STRING(40),
        userid: DataTypes.STRING(11),
        channel: DataTypes.INTEGER(2),
        created: DataTypes.STRING(11)
    },
    {
        tableName: 'lan_user_retain',
        freezeTableName: false, // table的名字与model的名字相同
        timestamps: false // default true
    });

    return Retain;
};