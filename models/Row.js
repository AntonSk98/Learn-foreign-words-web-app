const getDb = require('../database/mongo_db').getDb;
const ObjectId = require('mongodb').ObjectId;

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
            return commandResult
        } catch(err) {
            throw new Error(err)
        }
    }

    static async getRowsByCardId(cardId) {
        const db = getDb();
        return await db.collection('sticker_row').find({ cardId: new ObjectId(cardId)}).project({word: 1, translation: 1, example: 1}).toArray()
    }

    static async deleteRowsByCardId(cardId) {
        const db = getDb();
        return await db.collection('sticker_row').deleteMany({ cardId: new ObjectId(cardId) })
    }

    static async updateRow(cardId, row) {
        const db = getDb()
        await db.collection('sticker_row').updateOne(
            {
                _id: new ObjectId(row.id)
            },
            {
                $set: constructJsonFromRow(cardId, row)
            }
        )
    }

    static async createRow(cardId, row) {
        const db = getDb();
        await db.collection('sticker_row').insertOne(constructJsonFromRow(cardId, row))
    }

    static async deleteRowsByIds(rowIds) {
        const db = getDb();
        for (const rowId of rowIds) {
            await db.collection('sticker_row').deleteOne({_id: new ObjectId(rowId)})
        }
    }
}

const constructJsonFromRow = (cardId, row) => {
    return {
        word: row.word || '',
        translation: row.translation || '',
        example: row.example || '',
        cardId: new ObjectId(cardId)
    }
}

module.exports = Row