const Card = require('../models/Card')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_edit_card', {
        path: path,
        card: undefined
    })
}

const addNewCard = async (req, res, next) => {
    const cardInput = req.body;
    const card = new Card(cardInput.title, cardInput.description, 0, new Date().toDateString())
    card.save().then(cardId => console.log(`Inserted card with id ${cardId}`))
    
}


exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;