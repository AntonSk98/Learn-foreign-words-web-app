const Card = require('../models/card')

const editCardPage = (req, res, next) => {
    Card.getCardByCardId(req.params.cardId, card => {
        res.render('new_edit_card', {path: '/edit_card_page', card: card})
    })
}

const editCard = (req, res, next) => {
    Card.updateCard({...req.body}, ()=>{
        res.status(200).send({status: 'success'})
    })
}

const archiveCard = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.archiveCard(cardId, () => res.status(200).send({status: 'success'}))
}

const removeCard = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.removeCard(cardId, () => res.status(200).send({status: 'success'}))
}

const unarchiveCard = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.unarchiveCard(cardId, () => res.status(200).send({status: 'success'}))
}

const learnCardPage = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.getCardByCardId(cardId, card => res.render('learn_card.ejs', {
        path: '/learn_card_page',
        title: 'Learn card page',
        card: card
    }))
}

const reduceCardProgress = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.reduceCardProgress(cardId, () => res.status(200).send({status: 'success'}))
}

const improveCardProgress = (req, res, next) => {
    const cardId = req.params.cardId;
    Card.improveCardProgress(cardId, () => res.status(200).send({status: 'success'}))

}

exports.editCardPage = editCardPage;
exports.editCard = editCard;
exports.archiveCard = archiveCard;
exports.removeCard = removeCard;
exports.unarchiveCard = unarchiveCard;
exports.learnCardPage = learnCardPage;
exports.reduceCardProgress = reduceCardProgress;
exports.improveCardProgress = improveCardProgress;