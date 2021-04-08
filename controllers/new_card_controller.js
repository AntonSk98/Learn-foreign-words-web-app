const WordRow = require('../models/word_row')
const Card = require('../models/card')

const allCardsData = require('./all_cards_controller')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_card', {
        path: path
    })
}

const addNewCard = (req, res, next) => {
    allCardsData.allCards.push(parseInputToCard(req.body))
}

const parseInputToCard = inputData => {
    inputData = convertInputDataToArray(inputData);
    if (inputData.title === '' || inputData.description === '' || isSectiondEmpty(inputData.word) || isSectiondEmpty(inputData.translation)) {
        // TODO you should add some validation here?
        console.log('THERE ARE EMPTY FIELDS!')
        return;
    } // TODO replace if with switch case and make a separate function for the validation...
    console.log('all is good')


    const title = inputData.title;
    const description = inputData.description;
    const card = new Card(title, description);
    inputData.word.forEach((word, index) => {
        card.stickers = new WordRow(
            word, inputData.translation[index], inputData.example[index]
        );
    });
    console.log(card.toString())
    return card;
}

const isSectiondEmpty = (section) => {
    return section.some(element => element === '')
}

const convertInputDataToArray = inputData => {
    if (!Array.isArray(inputData.word))
        inputData.word = [inputData.word]
    if (!Array.isArray(inputData.translation))
        inputData.translation = [inputData.translation]
    if (!Array.isArray(inputData.example))
        inputData.example = [inputData.example]

    return inputData;
}

exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;