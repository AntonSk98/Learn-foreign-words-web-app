const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const sequelize = require('../database/database')

const StickerRow = require('./StickerRow')

class Card extends Sequelize.Model {

    static async getAllActiveCards() {
        return await Card.findAll(
            {
                where:
                    {
                        userId: 1,
                        progress: {
                            [Op.ne]: 100
                        }
                    },
                include: {
                    model: StickerRow,
                    attributes: ['word', 'translation', 'example']
                }
            })
    };

    static async getAllArchivedCards() {
        return await Card.findAll({
            where: {
                userId: 1,
                progress: {
                    [Op.eq]: 100
                }
            },
            include: StickerRow
        })
    }

    static async getCardWithStickerById(id) {
        return await Card.findByPk(id, {include: StickerRow})
    }
    
    static async getCardWithoutStickerById(id) {
        return await Card.findByPk(id)
    }

    static async removeCardById(id) {
        return await Card.destroy({
            where: {
                id: id
            }
        })
    }

    static async createNewCard(card) {
        const storedCard = await Card.create({
            title: card.title,
            description: card.description,
            progress: 0,
            userId: 1,
        })
        card.rows.forEach(row => {
            storedCard.createStickerRow({
                word: row.word || '',
                translation: row.translation || '',
                example: row.example || ''
            })
        })
    }

    async archiveCard() {
        this.progress = 100;
        return await this.save()
    }

    async unarchiveCard() {
        this.progress = 0;
        return await this.save()
    }

    async updateCard(updatedCard) {
        this.title = updatedCard.title;
        this.description = updatedCard.description;
        await StickerRow.destroy({
            where: {
                cardId: this.id
            }
        })
        await updatedCard.rows.forEach(row => StickerRow.create({
            word: row.word || '',
            translation: row.translation || '',
            example: row.example || '',
            cardId: this.id
        }))
        return await this.save()
    }

    async reduceCardProgress() {
        this.progress -= 5;
        try {
            await this.save();
            return {
                status: 200,
                message: `The progress for card with id ${this.id} was reduced by 5!`
            }
        } catch (error) {
            return {
                status: 403,
                message: `Your progress can\'t be below 0`
            }
        }
    }

    async increaseCardProgress() {
        this.progress +=5;
        try {
            await this.save()
            return {
                status: 200,
                message: `The progress for card with id ${this.id} was increased by 5!`
            }
        } catch (error) {
            return {
                status: 403,
                message: `Your progress can\'t be above 100`
            }
        }
    }
}

Card.init({
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

}, {
    sequelize,
    modelName: 'card'
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