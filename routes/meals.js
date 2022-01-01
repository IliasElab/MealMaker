const express = require('express');
const router = express.Router()
const dbmanager = require('../database')

//Every routes here is relative to the path localhost/meals/
//router.post('/', (req, res) => {
router.get('/', (req, res) => {
    let recipes;

    if (Object.keys(req.query).length === 0){
        recipes = dbmanager.Mongo_GetAllRecipes();
    }
    else{
        const string_body = Object.keys(req.query).map((i) => req.query[i])
        recipes = dbmanager.Mongo_GetMatchingRecipes(string_body); 
    }
    recipes.then((result) => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.get('/all', (req, res) => {
    let recipes = dbmanager.Mongo_GetAllRecipes();
    recipes.then((result) => {
        res.status(200).send(JSON.stringify(result))
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.get('/category/:name', (req, res) => {
    let recipe = dbmanager.Mongo_ByCategories(req.params.name);
    recipe.then((result) => {
        res.render('recommended.ejs', { recipes: result })
    })
})

router.get('/:id', (req, res) => {
    let recipe = dbmanager.Mongo_GetOneRecipe(req.params.id);
    recipe.then((result) => {
        res.render('recipe.ejs', { recipe: result })
    })
})

module.exports = router