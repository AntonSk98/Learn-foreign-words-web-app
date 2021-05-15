const getDb = require('../database/mongo_db').getDb;
const ObjectId = require('mongodb').ObjectId
const Row = require('./Row')

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

    static async getAllActiveCardsWithRows() {
        const db = getDb();
        const cards = await db.collection('card').find({progress: { $ne: 100 }}).toArray();
        await attachRowsToCards(cards)
        return cards
    }

    static async getAllArchivedCardsWithRows() {
        const db = getDb();
        const cards = await db.collection('card').find({progress: { $eq: 100 }}).toArray();
        await attachRowsToCards(cards)
        return cards
        
    }

    static async archiveCardById(cardId) {
        await updateCardProgressById(cardId, 100)
    }

    static async unarchiveCardById(cardId) {
        await updateCardProgressById(cardId, 0)
    }
    
    static async removeCardById(cardId) {
        const db = getDb();
        try {
            await Row.deleteRowsByCardId(cardId)
        } catch (err) {
            throw new Error(err)
        }
        await db.collection('card').deleteOne({_id: new ObjectId(cardId)})
    }

    static async getCardWithRowsById(cardId) {
        const db = getDb();
        const card = await db.collection('card').find({_id: new ObjectId(cardId)}).next()
        card.rows = await Row.getRowsByCardId(card._id)
        return card;
    }

    static async updateCard(updatedCard) {
        const db = getDb();
        const oldRows = await Row.getRowsByCardId(updatedCard.id)
        const oldRowIds = oldRows.map(oldRow => oldRow._id)
        const updatedRowIds = updatedCard.rows.map(row => row.id)
        const removedRowsIds = oldRowIds.filter(oldRowId => !updatedRowIds.includes(String(oldRowId)))
        await Row.deleteRowsByIds(removedRowsIds)
        for (const updatedRow of updatedCard.rows) {
            if (updatedRow.id)
                await Row.updateRow(updatedCard.id, updatedRow)
            else await Row.createRow(updatedCard.id, updatedRow)
        }
        await db.collection('card').updateOne(
            {
                _id: new ObjectId(updatedCard.id)
            },
            {
                $set: {
                    title: updatedCard.title,
                    description: updatedCard.description
                }
            }
        )
    }

}

const updateCardProgressById = async (cardId, progress) => {
    const db = getDb();
    await db.collection('card').updateOne(
        { _id: new ObjectId(cardId) },
        {
            $set: { progress: progress }
        }
    )
}

const attachRowsToCards = async cards => {
    for (const card of cards) {
        const row = await Row.getRowsByCardId(card._id)
        card.rows = [...row]
    }
    return cards;
}

module.exports = Card;