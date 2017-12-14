"use strict";

module.exports = function(sequelize, DataTypes){

    var Daily = sequelize.define('Daily', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: DataTypes.STRING(11),
        uv_sum: DataTypes.INTEGER,
        uv_h: DataTypes.TEXT,
        pv_sum: DataTypes.INTEGER,
        pv_h: DataTypes.TEXT,
        ip_sum: DataTypes.INTEGER,
        ip_h: DataTypes.TEXT,
        created: DataTypes.INTEGER
    },
    {
        tableName: 'lan_daily_logs',
        freezeTableName: false, // table的名字与model的名字相同
        timestamps: false // default true
    });

    return Daily;
};