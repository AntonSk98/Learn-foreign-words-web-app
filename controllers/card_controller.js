// const Card = require('../models/card')
const { getCardWithoutStickerById: getEditedCardWithoutStickerById } = require('../models/Card');
const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')

const editCardPage = async (req, res, next) => {
    const id = req.params.cardId;
    const card = await Card.getCardWithStickerById(id)
    res.render('new_edit_card', {
        path: '/edit_card_page',
        card: card
    })
}

const editCard = async (req, res, next) => {
    const updatedCard = req.body
    const card = await Card.getCardWithoutStickerById(updatedCard.id)
    await card.updateCard(updatedCard)
    res.status(200).send({message: `Card with id ${card.id} is successfully updated!`})
}

const archiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithStickerById(cardId)
    await card.archiveCard()
    res.status(200).send({message: `Card is put into arcive!`})
}

const removeCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    await Card.removeCardById(cardId)
    res.status(200).send({message: `Card with id ${cardId} is successfully deleted!`})
}

const unarchiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithoutStickerById(cardId)
    await card.unarchiveCard(cardId)
    res.status(200).send({message: `Card with id ${cardId} us successfully unarchived! The progress is reset...`})
}

const learnCardPage = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithStickerById(cardId)
    res.render('learn_card.ejs', {
        path: '/learn_card_page',
        title: 'Learn card page',
        card: card
    })
}

const reduceCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithoutStickerById(cardId)
    const result = await card.reduceCardProgress()
    res.status(result.status).send(result.message)
}

const improveCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.getCardWithoutStickerById(cardId)
    const result = await card.increaseCardProgress()
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