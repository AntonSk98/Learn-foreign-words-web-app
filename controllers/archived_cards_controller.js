const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')
const { Op } = require('sequelize')

const getArchivedCardsPage = async (req, res, next) => {
    const archivedCards = await Card.findAll({
        where: {
            userId: 1,
            progress: {
                [Op.eq]: 100
            }
        },
        include: StickerRow
    })
    res.render('archived_cards.ejs', {
        title: 'Archived cards',
        path: '/archived_cards',
        archivedCards: archivedCards
    })
}

exports.getArchivedCardsPage = getArchivedCardsPage