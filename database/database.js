const mongoose = require('mongoose')
const config = require('./noSql_config.json')

const getMongooseConnection = async () => {
    return await mongoose.connect(config.connection_string, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = getMongooseConnection;