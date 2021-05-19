const MongoClient = require('mongodb').MongoClient

const config = require('./noSql_config.json')

let _db;

const mongoConnect = async () => {
    try {
        const mongoClient = await MongoClient.connect(config.connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        _db = mongoClient.db()
        return _db // if there is no such database that is used in our connection string then mongodb will create it for us automatically
    } catch(err) {
        throw new Error(err)
    }
}

const getDb = () => {
    if (!_db)
        throw new Error('Please connect to the database!')
    return _db
    
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


