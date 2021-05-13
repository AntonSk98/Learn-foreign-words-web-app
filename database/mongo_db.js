const MongoClient = require('mongodb').MongoClient

const config = require('./noSql_config.json')

let mongoClient;

const connectToDb = async () => {
    if (mongoClient) {
        return mongoClient
    }
    try {
    mongoClient = await MongoClient.connect(config.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    } catch(err) {
        throw new Error(err)
    }
    return mongoClient
}

module.exports = connectToDb;


