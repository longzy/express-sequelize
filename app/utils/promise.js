
var path = require('path');
var pool    = require(path.join(__dirname, '../..', 'config', 'pool.js'));

function dbPromise(sql){
    return new Promise(function(resolve, reject){

            pool.getConnection(function(err,connection){
                if(err){
                    console.log(err);
                    reject(err)
                }
                
                connection.query( sql ,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                    connection.release();
                })
            })
        })
}

module.exports = dbPromise