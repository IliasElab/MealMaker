const express = require('express');
const router = express.Router()
const dbmanager = require('../database')

//Every routes here is relative to the path localhost/meals/
router.post('/', (req, res) => {
    let recipes = dbmanager.Mongo_GetMatchingRecipes(JSON.parse(req.body.ingredients));
    recipes.then((result) => {
        res.render('recommended.ejs', { recipes: result })
    })
});

router.get('/:id', (req, res) => {
    let recipe = dbmanager.Mongo_GetOneRecipe(req.params.id);
    recipe.then((result) => {
        console.log(result)
        res.render('recipe.ejs', { recipe: result })
    })
})

module.exports = router