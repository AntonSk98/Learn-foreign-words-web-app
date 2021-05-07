// const Card = require('../models/card')
const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')

const editCardPage = async (req, res, next) => {
    const id = req.params.cardId;
    const card = await Card.findByPk(id, {include: StickerRow})
    res.render('new_edit_card', {
        path: '/edit_card_page',
        card: card
    })
}

const editCard = async (req, res, next) => {
    const updatedCard = req.body
    const card = await Card.findByPk(updatedCard.id, {include: StickerRow})
    card.title = updatedCard.title;
    card.description = updatedCard.description;
    await StickerRow.destroy({
        where: {
            cardId: card.id
        }
    })
    await updatedCard.rows.forEach(row => StickerRow.create({
        word: row.word || '',
        translation: row.translation || '',
        example: row.example || '',
        cardId: card.id
    }))
    res.status(200).send({message: `Card with id ${card.id} is successfully updated!`})
}

const archiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);
    card.progress = 100;
    await card.save()
    res.status(200).send({message: `Card is put into arcive!`})
}

const removeCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    await Card.destroy({
        where: {
            id: cardId
        }
    })
    res.status(200).send({message: `Card with id ${cardId} is successfully deleted!`})
}

const unarchiveCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);
    card.progress = 0;
    card.save()
    res.status(200).send({message: `Card with id ${cardId} us successfully unarchived! The progress is reset...`})
}

const learnCardPage = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId, {include: StickerRow})
    res.render('learn_card.ejs', {
        path: '/learn_card_page',
        title: 'Learn card page',
        card: card
    })
}

const reduceCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);
    card.progress -= 5;
    try {
        await card.save()
        res.status(200).send({message: `The progress for card with id ${cardId} was reduced by 5!`})
    } catch (error) {
        res.status(403).send({message: 'Your progress can\'t be below 0'})
    }
}

const improveCardProgress = async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);
    card.progress += 5;
    try {
        await card.save()
        res.status(200).send({message: `The progress for card with id ${cardId} was increased by 5!`})
    } catch (error) {
        res.status(403).send({message: 'Your progress can\'t be above 100'})
    }
}

exports.editCardPage = editCardPage;
exports.editCard = editCard;
exports.archiveCard = archiveCard;
exports.removeCard = removeCard;
exports.unarchiveCard = unarchiveCard;
exports.learnCardPage = learnCardPage;
exports.reduceCardProgress = reduceCardProgress;
exports.improveCardProgress = improveCardProgress;