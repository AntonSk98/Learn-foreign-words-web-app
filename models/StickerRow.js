const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const StickerRow = sequelize.define('stickerRow', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    word: Sequelize.STRING,
    translation: Sequelize.STRING,
    example: Sequelize.TEXT
})

module.exports = StickerRow;