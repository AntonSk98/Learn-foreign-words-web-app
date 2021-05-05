const express = require('express');
const path = require('path')

const app = express();

const newCardRouter = require('./routes/new_card');
const allCardsRouter = require('./routes/all_cards');
const cardRouter = require('./routes/card')
const archivedCardsRouter = require('./routes/archived_cards')

const errorController = require('./controllers/error_controller')

const sequelize = require('./database/database')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use("/add_cards", express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('', newCardRouter.router);
app.use('', allCardsRouter.router);
app.use('', cardRouter.router);
app.use('', archivedCardsRouter.router)

app.use(errorController.get404Page);

app.listen(3000, () => {
    const Card = require('./models/Card')
    const StickerRow = require('./models/StickerRow')
    const User = require('./models/User')
    sequelize.sync({force: true})
    setTimeout(() => User.create({
        name: 'Anton',
        surname: 'Skripin',
        password: 'hello'
    }), 3000)
    console.log('Application is started on port 8000!');
})