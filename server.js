const express = require('express');
const app = express()
const mealsRouter = require('./routes/meals')
const dbmanager = require('./database')

app.set('view engine', 'ejs')

app.use(express.static(__dirname+ '/public'));
app.use(express.urlencoded({ extended: false}))

async function indexFct(){
    try {
        await dbmanager.openDB();
        let ingredients = await dbmanager.getAllIngredients(openeddb)
        return ingredients
    } catch (error) {
        console.log(error);
    } finally {
        dbmanager.closeDB(openeddb)
    }
}

app.get('/', (req, res) => {
    let data = indexFct();
    res.render('index', { ingredients: data})
})

app.use('/meals', mealsRouter)

app.listen(5000)