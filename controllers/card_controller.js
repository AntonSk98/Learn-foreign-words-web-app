const Card = require('../models/Card')
const StickerRow = require('../models/Row')

const editCardPage = async (req, res, next) => {
    const id = req.params.cardId;
    const card = await Card.getCardWithRowsById(id)
    res.render('new_edit_card', {
        path: '/edit_card_page',
        card: card
    })
}

const editCard = async (req, res, next) => {
    const updatedCard = req.body
    await Card.updateCard(updatedCard)
    res.status(200).send({message: `Card with id ${updatedCard.id} is successfully updated!`})
}

const archiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    await Card.archiveCardById(cardId)
    res.status(200).send({message: `Card is put into arcive!`})
}

const removeCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    await Card.removeCardById(cardId)
    res.status(200).send({message: `Card with id ${cardId} is successfully deleted!`})
}

const unarchiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    await Card.unarchiveCardById(cardId)
    res.status(200).send({message: `Card with id ${cardId} us successfully unarchived! The progress is reset...`})
}

const learnCardPage = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithRowsById(cardId)
    res.render('learn_card.ejs', {
        path: '/learn_card_page',
        title: 'Learn card page',
        card: card
    })
}

const reduceCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const result = await Card.reduceCardProgressById(cardId)
    res.status(result.status).send(result.message)
}

const improveCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const result = await Card.improveCardProgressById(cardId)
    res.status(result.status).send(result.message)
}

exports.editCardPage = editCardPage;
exports.editCard = editCard;
exports.archiveCard = archiveCard;
exports.removeCard = removeCard;
exports.unarchiveCard = unarchiveCard;
exports.learnCardPage = learnCardPage;
exports.reduceCardProgress = reduceCardProgress;
exports.improveCardProgress = improveCardProgress;