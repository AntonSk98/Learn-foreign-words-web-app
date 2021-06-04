const mongoose = require('mongoose')
const databaseConfig = require('./config.json')

const connectToDatabase = async () => {
    await mongoose.connect(databaseConfig.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Successfully connected to the database...')
}

module.exports = connectToDatabase;


