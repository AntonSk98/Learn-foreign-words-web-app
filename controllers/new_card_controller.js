const WordRow = require('../models/word_row')
const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')
const User = require('../models/User')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_edit_card', {
        path: path,
        card: undefined
    })
}

const addNewCard = async (req, res, next) => {
    const user = await User.findOne({where: {id: 1}}) // TODO remove this user in the future!
    const card = req.body;
    const storedCard = await Card.create({
        title: card.title,
        description: card.description,
        progress: 0,
        userId: user.id,
    })
    card.rows.forEach(row => {
        storedCard.createStickerRow({
            word: row.word || '',
            translation: row.translation || '',
            example: row.example || ''
        })
    })
    console.log(storedCard)
    res.status(200).send({message: 'Card is added successfully!'})
}


exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;