const Card = require('../models/card')

const editCardPage = (req, res, next) => {
    Card.getCardByCardId(req.params.cardId, card => {
        res.render('new_edit_card', {path: '/aa', card: card})
    })
}

const editCard = (req, res, next) => {
    Card.updateCard({...req.body}, ()=>{
        res.status(200).send({status: 'success'})
    })
}

exports.editCardPage = editCardPage;
exports.editCard = editCard;