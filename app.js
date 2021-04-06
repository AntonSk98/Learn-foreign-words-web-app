const express = require('express');
const path = require('path')

const app = express();

const newCardRouter = require('./routes/new_card')

app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')));

app.use('', newCardRouter.router);

app.listen(8000, () => {
    console.log('Application is started successfully!')
})