const Card = require('../models/Card')
const User = require('../models/User')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_edit_card', {
        path: path,
        card: undefined
    })
}

const addNewCard = async (req, res, next) => {
    const card = req.body;
    await Card.createNewCard(card)
    res.status(200).send({
            message: 'Card is added successfully!'
        })
}


exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;