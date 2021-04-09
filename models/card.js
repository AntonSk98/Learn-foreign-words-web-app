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

    #title;
    #description;
    #stickers = [];
    #createdAt;

    constructor(title, description, createdAt) {
        this.#title = title;
        this.#description = description;
        this.#createdAt = createdAt;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get stickers() {
        return this.#stickers;
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

    set stickers(wordRow) {
        this.#stickers.push(wordRow);
    }

    set createdAt(createdAt) {
        this.#createdAt = createdAt;
    }

    save() {
        getAllCardsFromFile((cards, pathToFile) => {
            cards.push(this)
            fs.writeFile(pathToFile, JSON.stringify(cards), ()=> {});
        })
    }

    static fetchAll(callback) {
        getAllCardsFromFile(callback);
    }

    toString() {
        return `Title = ${this.#title}; Description = ${this.#description}; Stickers = ${this.stickers}`
    }

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            stickers: this.#stickers.map(sticker => sticker.toJSON()),
            createdAt: this.#createdAt
        }
    }
}