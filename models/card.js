module.exports = class Card {

    #title;
    #description;
    #stickers = [];

    constructor(title, description) {
        this.#title = title;
        this.#description = description;
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

    set title(title) {
        this.#title = title;
    }

    set description(description) {
        this.#description = description;
    }

    set stickers(wordRow) {
        this.#stickers.push(wordRow)
    }

    toString() {
        return `Title = ${this.#title}; Description = ${this.#description}; Stickers = ${this.stickers}`
    }
}