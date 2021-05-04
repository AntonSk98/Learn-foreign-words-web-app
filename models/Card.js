const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Card = sequelize.define('Card', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    progress: Sequelize.NUMBER,
    
})