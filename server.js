const express = require('express');
const app = express()
const mealsRouter = require('./routes/meals')
const dbmanager = require('./database')

app.set('view engine', 'ejs')

app.use(express.static(__dirname+ '/public'));
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    let indexFct = async function() {
        let open_DB = await dbmanager.openDB();
        try {
            let ingredients = await dbmanager.getAllIngredients(open_DB)
            return ingredients;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            dbmanager.closeDB(open_DB)
        }
    };

    indexFct().then((data) => {
        if (data != false){
            res.render('index', { ingredients: data});
        }
    })
})

app.use('/meals', mealsRouter)

app.listen(5000)