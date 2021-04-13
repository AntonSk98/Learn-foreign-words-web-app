const WordRow = require('../models/word_row')
const Card = require('../models/card')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_card', {
        path: path
    })
}

const addNewCard = (req, res, next) => {
    parseBodyToCardObject(req.body)
    res.status(200).send({result: 'success'})
}

const parseBodyToCardObject = body => {
    const title = body.title;
    const description = body.description;
    const card = new Card(title, description, new Date().toDateString());
    body.rows.forEach(row => {
        card.stickers.push(new WordRow(
            row.word, row.translation, row.example
        ))
    });
    
    card.save(); 
}

exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;