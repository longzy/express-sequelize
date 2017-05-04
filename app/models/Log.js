module.exports = function(sequelize, DataTypes){

    var Log = sequelize.define('Log', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: DataTypes.INTEGER,
        uuid: DataTypes.STRING(40),
        ip: DataTypes.STRING(32),
        parameter0: DataTypes.STRING(100),
        parameter1: DataTypes.STRING(100),
        parameter2: DataTypes.STRING(100),
        parameter3: DataTypes.STRING(100),
        parameter4: DataTypes.STRING(100),
        parameter5: DataTypes.STRING(100),
        parameter6: DataTypes.STRING(100),
        parameter7: DataTypes.STRING(100),
        parameter8: DataTypes.STRING(100),
        parameter9: DataTypes.STRING(100),
        isDeleted: DataTypes.INTEGER,
        updated: DataTypes.INTEGER,
        created: DataTypes.INTEGER
    },
    {
        tableName: 'lanlan_logs1',
        freezeTableName: false, // table的名字与model的名字相同
        timestamps: false // default true
    });

    return Log;
}