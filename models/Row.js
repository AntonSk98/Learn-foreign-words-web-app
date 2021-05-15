const getDb = require('../database/mongo_db').getDb;

class Row {
    constructor (word, translation, example, cardId) {
        this.word = word;
        this.translation = translation;
        this.example = example;
        this.cardId = cardId;
    }

    async save() {
        const db = getDb();
        try {
            const commandResult = await db.collection('sticker_row').insertOne(this)
            console.log({...commandResult})
            return commandResult
        } catch(err) {
            throw new Error(err)
        }
    }

    static async getRowsByCardId(cardId) {
        const db = getDb();
        return await db.collection('sticker_row').find({ cardId: cardId}).project({word: 1, translation: 1, example: 1, _id: 0}).toArray()
    }
}

module.exports = Row