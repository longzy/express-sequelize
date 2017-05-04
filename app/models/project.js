module.exports = function (sequelize, DataTypes) {

    var Project = sequelize.define('project', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING
        },
        {
            freezeTableName: true, // table的名字与model的名字相同
            timestamps: false
        });

    return Project;
};