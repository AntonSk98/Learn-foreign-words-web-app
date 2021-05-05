const Sequelize = require('sequelize')
const sequelize = require('../database/database')
const bcrypt = require('bcrypt')

const Card = require('./Card')

const saltRounds = 15

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(password) {
            this.setDataValue('password', generateHash(password, saltRounds))
        }
    }
})

User.hasMany(Card, {
    foreignKey: {
        allowNull: false
    }
})
Card.belongsTo(User)

const generateHash = (password, saltRounds) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash
}

module.exports = User;