var db = require('../models');

var LogRepository = {
    insertLog: function (log) {
        return db.Log.create(log);
    }
}

module.exports = LogRepository;