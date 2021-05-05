const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const StickerRow = require('./StickerRow')

const Card = sequelize.define('card', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    progress: Sequelize.INTEGER,

})

Card.hasMany(StickerRow, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false,
    }
})
StickerRow.belongsTo(Card)

module.exports = Card