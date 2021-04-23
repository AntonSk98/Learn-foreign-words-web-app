const { Cipher } = require('crypto');
const fs = require('fs');
const path = require('path');

const getAllCardsFromFile = callback => {
    const pathToFile = path.join(__dirname, "../data/products.json");
    fs.readFile(pathToFile, (err, content) => {
        if (!err && content.length > 0)
            callback(JSON.parse(content), pathToFile)
        else
            callback([], pathToFile)
    })
}

module.exports = class Card {

    #id;
    #title;
    #description;
    #rows = [];
    #createdAt;
    #progress;

    constructor(title, description, createdAt) {
        this.#id = Math.random();
        this.#title = title;
        this.#description = description;
        this.#createdAt = createdAt;
        this.#progress = 0;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get rows() {
        return this.#rows;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set title(title) {
        this.#title = title;
    }

    set description(description) {
        this.#description = description;
    }

    set rows(wordRow) {
        this.#rows.push(wordRow);
    }

    set createdAt(createdAt) {
        this.#createdAt = createdAt;
    }

    increaseProgress() {
        this.#progress += 5;
    }

    decreaseProgress() {
        this.#progress -= 5;
    }

    setMaxProgress() {
        this.#progress = 100;
    }

    resetProgress() {
        this.#progress = 0;
    }

    setProgress(progress) {
        this.#progress = progress;
    }

    save() {
        getAllCardsFromFile((cards, pathToFile) => {
            cards.push(this)
            fs.writeFile(pathToFile, JSON.stringify(cards), ()=> {});
        })
    }

    static getCardByCardId(cardId, callback) {
        getAllCardsFromFile(cards => {
            const neededCard = cards.find(card => card.id === Number(cardId))
            if (neededCard)
                callback(neededCard)
            else
                throw new Error("The card is not found!")
        })
    }

    static fetchAll(callback) {
        getAllCardsFromFile(callback);
    }

    static fetchAllActiveCards(callback) {
        getAllCardsFromFile(cards => {
            const activeCards = cards.filter(card => card.progress !== 100)
            callback(activeCards)
        })
    }

    static updateCard(card, callback) {
        const cardId = card.id;
        getAllCardsFromFile((cards, pathToFile) => {
            const updatedCards =[...cards]
            const index = updatedCards.findIndex(card => card.id === cardId)
            updatedCards[index] = card
            fs.writeFile(pathToFile, JSON.stringify(updatedCards), ()=>{})
            callback({cards: [...updatedCards]})
        })
    }

    static archiveCard(cardId, callback) {
        getAllCardsFromFile((cards, pathToFile) => {
            cards.forEach(card => {
                if (card.id === Number(cardId))
                    card.progress = 100
            });
            fs.writeFile(pathToFile, JSON.stringify(cards), ()=>{})
            callback()
        })
    }

    static removeCard(cardId, callback) {
        getAllCardsFromFile((cards, pathToFile) => {
            const processedCards = cards.filter(card => card.id !== Number(cardId));
            fs.writeFile(pathToFile, JSON.stringify(processedCards), ()=> {
                callback()
            })
        })
    }

    static getArchivedCards(callback) {
        getAllCardsFromFile(cards => {
            const archivedCards = cards.filter(card => card.progress === 100)
            callback(archivedCards)
        })
    }

    static unarchiveCard(cardId, callback) {
        getAllCardsFromFile((cards, pathToFile) => {
            cards.forEach(card => {
                if (card.id === Number(cardId))
                    card.progress = 0;
            });
            fs.writeFile(pathToFile, JSON.stringify(cards), () => {
                callback()
            })
        })
    }

    static reduceCardProgress(cardId, callback) {
        Card.#manipulateCardProgress(cardId, callback, -5)
    }

    static improveCardProgress(cardId, callback) {
        Card.#manipulateCardProgress(cardId, callback, 5)
    }

    static #manipulateCardProgress(cardId, callback, value) {
        getAllCardsFromFile((cards, pathToFile) => {
            cards.forEach(card => {
                if (card.progress >= 100 && value > 0)
                    return
                if (card.id === Number(cardId) && card.progress > 0) {
                    card.progress += value
                }
                if (card.progress === 0 && value > 0)
                    card.progress += value
            });
            fs.writeFile(pathToFile, JSON.stringify(cards), () => {
                callback()
            })
        })
    }

    toString() {
        return `ID = ${this.#id} Title = ${this.#title}; Description = ${this.#description}; Progress = ${this.#progress} Rows = ${this.rows}`
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            rows: this.#rows.map(row => row.toJSON()),
            createdAt: this.#createdAt,
            progress: this.#progress
        }
    }
}