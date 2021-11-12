const express = require('express');
const app = express()
const mealsRouter = require('./routes/meals')
const dbmanager = require('./database')

app.set('view engine', 'ejs')

app.use('/meals', mealsRouter)

app.get('/', (req, res) => {
    const ingredients = [{
        name: 'Test',
        category: 'category'
    }];
    res.render('index', { ingredients: ingredients})
    //res.send('Hello World')
})

app.listen(5000)