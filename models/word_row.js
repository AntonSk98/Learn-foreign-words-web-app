module.exports = class WordRow {

    #word;
    #translation;
    #example;

    constructor(word, translation, example) {
        this.#word = word;
        this.#translation = translation;
        this.#example = example;
    }

    get word() {
        return this.#word;
    }

    get translation() {
        return this.#translation;
    }

    get example() {
        return this.#example
    }

    set word(word) {
        this.#word = word;
    }

    set translation(translation) {
        return this.#translation = translation;
    }

    set example(example) {
        return this.#example = example;
    }

    toString () {
        return `\n Word: ${this.#word}; Translation: ${this.#translation}; Example: ${this.#example}`;
    }

    toJSON() {
        return {
            word: this.#word,
            translation: this.#translation,
            example: this.#example
        }
    }
}