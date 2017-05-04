var db = require('../models');

var UsersRepository = {
    addUser: function () {
        console.log("project: ");
        console.log(db.project);

        return db.project.create({
            name: 'Gaffey'
        });
    },

    findByName: function (name) {
        return db.Project.findAll({
            where: {
                name: name
            }
        })
    }
}

module.exports = UsersRepository;