const Sequelize = require ('sequelize')
const fs = require('fs')
const path = require('path')

// const sequelize = new Sequelize(readJsonProperties)

const setUpConnection = () => {
    const { database, username, password, host, dialect, port } = readJsonConfig().then(sth => content(sth))
}

const readJsonConfig = () => {
    const pathToFile = path.join(__dirname, '/db_config.json')
    fs.readFile(pathToFile, (err, content) => {
        if (err)
            throw new Error('Error happened while reading the config file')
        return JSON.parse(content)
    })
}

module.exports = readJsonConfig()