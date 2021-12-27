const express = require('express');
const router = express.Router()
const dbmanager = require('../database')

//Every routes here is relative to the path localhost/meals/
router.post('/', (req, res) => {
    console.log(req.body)
    let recipes = dbmanager.Mongo_GetMatchingRecipes(req.body);
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