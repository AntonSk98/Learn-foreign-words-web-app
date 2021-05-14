const Card = require('../models/Card')
const Row = require('../models/Row')

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
    const cardId = await card.save()
    cardInput.rows.forEach(row => {
        new Row(
            row.word || '',
            row.translation || '',
            row.example || '',
            cardId
        ).save()
    })
    console.log('doneee') 
}


exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;