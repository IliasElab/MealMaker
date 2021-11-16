const express = require('express');
const router = express.Router()
const dbmanager = require('../database')

//Every routes here is relative to the path localhost/meals/
/*
router.get('/', (req, res) => {
    res.render('recommended.ejs')
})
*/
router.post('/', (req, res) => {
    console.log(req.body)
    let recipes = dbmanager.Mongo_GetMatchingRecipes(req.body.ingredients);
    recipes.then((result) => { 
        res.render('recommended.ejs', { recipes: result })
    })
})

module.exports = router