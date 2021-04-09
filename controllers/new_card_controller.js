const WordRow = require('../models/word_row')
const Card = require('../models/card')

const getAddNewCardPage = (req, res, next) => {
    const wordRow1 = new WordRow('a', 'b', 'c');
    res.render('new_card')
    const path = 'add_new_card';
    res.render('new_card', {
        path: path
    })
}

exports.getAddNewCardPage = getAddNewCardPage;
const addNewCard = (req, res, next) => {
    const inputData = convertInputDataToArray(req.body);
    if (isFormValid(inputData)) {
        parseInputToCard(inputData)
        res.redirect('/all_cards');
    }
    else {
        res.json('FORM IS INVALID');
    }
}

const parseInputToCard = inputData => {
    const title = inputData.title;
    const description = inputData.description;
    const card = new Card(title, description, new Date().toDateString());
    inputData.word.forEach((word, index) => {
        card.stickers = new WordRow(
            word, inputData.translation[index], inputData.example[index]
        );
    });
    console.log(card.toString())
    card.save(); 
}

const isFormValid = inputData => {
    if (inputData.title === '' || inputData.description === '' || isSectiondEmpty(inputData.word) || isSectiondEmpty(inputData.translation)) {
        return false;
    }
    return true;
}

const isSectiondEmpty = (section) => {
    if (section === undefined)
        return true;
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