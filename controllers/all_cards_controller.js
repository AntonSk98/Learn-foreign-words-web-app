const allCards = [];

const getAllCardsPage = (req, res, next) => {
    const path = 'all_cards';
    res.render('all_cards', {
        path: path
    })
}

exports.getAllCardsPage = getAllCardsPage;
exports.allCards = allCards;