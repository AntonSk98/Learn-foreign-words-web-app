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
    progress: {
        type: Sequelize.INTEGER,
        validate: {
            max: 100,
            min: 0
        }
    },
    createdAt: {
        type: Sequelize.DATEONLY
    }

})

Card.hasMany(StickerRow, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        allowNull: false,
    }
})
StickerRow.belongsTo(Card)

module.exports = Card