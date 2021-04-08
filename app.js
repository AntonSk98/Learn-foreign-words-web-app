const express = require('express');
const path = require('path')

const app = express();

const newCardRouter = require('./routes/new_card');
const allCardsRouter = require('./routes/all_cards');

app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}))
app.use('', newCardRouter.router);
app.use('', allCardsRouter.router);

app.listen(8000, () => {
    console.log('Application is started successfully!')
})