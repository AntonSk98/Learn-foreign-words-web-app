cards = []

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
        cards.push(this)
    }

    static fetchAll() {
        return cards;
    }

    toString() {
        return `Title = ${this.#title}; Description = ${this.#description}; Stickers = ${this.stickers}`
    }
}