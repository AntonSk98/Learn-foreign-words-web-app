const Sequelize = require ('sequelize')

const config = require('./config.json')

const sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    dialect: config.dialect,
    port: config.port
})


module.exports = sequelize;