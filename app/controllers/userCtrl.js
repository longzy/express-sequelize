var userRepo = require("../data/userRepo");

function findAll(req, res) {
    res.send([{
        "id": 1,
        "name": "Max"
    }]);
}

function addUser(req, res) {
    userRepo.addUser()
        .then(function (p) {
            console.log('created.' + JSON.stringify(p));
            res.send([{
                "id": 1,
                "name": "Gaffey"
            }]);
        }).catch(function (err) {
        console.log('failed: ' + err);
    });
}

module.exports = {
    findAll: findAll,
    addUser: addUser
}