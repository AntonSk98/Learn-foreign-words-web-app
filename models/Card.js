const getDb = require('../database/mongo_db').getDb;

class Card {
    constructor(title, description, progress, createdAt) {
        this.title = title;
        this.description = description;
        this.progress = progress;
        this.createdAt = createdAt;
    }

    async save() {
        const db = getDb();
        try {
            const commandResult = await db.collection('card').insertOne(this)
            return commandResult.insertedId
        } catch(err) {
            throw new Error(err)
        }
    }
}

module.exports = Card;