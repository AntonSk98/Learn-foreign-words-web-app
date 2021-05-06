const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')
const { Op } = require("sequelize");

const getAllCardsPage = async (req, res, next) => {
    const path = 'all_cards';
    const cards = await Card.findAll(
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
    console.log(cards)
    res.render('all_cards', {
        path: path,
        allCards: cards
    })
}

exports.getAllCardsPage = getAllCardsPage;