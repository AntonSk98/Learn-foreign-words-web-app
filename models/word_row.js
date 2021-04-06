module.exports = class WordRow {

    #word;
    #translation;
    #example;

    constructor(word, translation, example) {
        this.#word = word;
        this.#translation = translation;
        this.#example = example;
    }

    getWord() {
        return this.#word;
    }

    getTranslation() {
        return this.#translation;
    }

    getExample() {
        return this.#example
    }
}