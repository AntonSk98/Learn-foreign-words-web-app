const Card = require('../models/card')

const getArchivedCardsPage = (req, res, next) => {
    Card.getArchivedCards(archivedCards => {
        res.render('archived_cards.ejs', {
            title: 'Archived cards',
            path: 'archived_cards',
            archivedCards: archivedCards
        })
    })
}

exports.getArchivedCardsPage = getArchivedCardsPage