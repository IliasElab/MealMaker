const express = require('express');
const app = express()
const mealsRouter = require('./routes/meals')
const dbmanager = require('./database')

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    let db = dbmanager.openDB();
    db.then(
        (openeddb) => { 
            let ingredients = dbmanager.getAllIngredients(openeddb)
            ingredients.then(
                (result) => {
                    res.render('index', { ingredients: result})
            }).finally( 
                () => {
                    dbmanager.closeDB(openeddb)
            }) 
        },
        (error) => { 
            console.log(error);
        }
    );
})

app.use('/meals', mealsRouter)

app.listen(5000)