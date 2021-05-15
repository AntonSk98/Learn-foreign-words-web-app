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

    static async getAllActiveCards() {
        const db = getDb();
        return await db.collection('card').find({progress: { $ne: 100 }}).toArray();
    }
}

module.exports = Card;