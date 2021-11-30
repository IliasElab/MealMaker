const sqlite3 = require('sqlite3').verbose();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = 'mongodb://localhost:27017/MealMaker'

module.exports = {
  Mongo_GetAllRecipes: function(){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("MealMaker");
        dbo.collection("recipes").find({}).toArray(function(err, result) {
          if (err) reject(err);
          db.close();
          resolve(result)
        });
      });
    });
  }
,
  Mongo_GetOneRecipe: function(recipe){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("MealMaker");
        var o_id = new ObjectId(recipe)
        var query = { _id: o_id };
        dbo.collection("recipes").findOne(query, function(err, result) {
          if (err) reject(err);
          db.close();
          resolve(result)
        });
      });
    });
  }
,
  Mongo_GetMatchingRecipes: function(body){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("MealMaker");

        var dict = [];
        let ingredients = body.ingredients;
        let amounts = body.quantities;
        let units = body.units;

        if (typeof ingredients === 'undefined' || typeof amounts === 'undefined' || typeof units === 'undefined'){
          return resolve([])
        }
        else if (typeof ingredients === 'string' && typeof amounts === 'string' && typeof units === 'string') {
          if (amounts == "" || !amounts.match(/^[0-9]+$/)){
            reject('The amount of ' + ingredients + ' is not a number')
          }
          dict.push({
            ingredient: ingredients,
            amount: parseInt(amounts),
            unit: units
          });

        } else {
          let i = 0;
          amounts.forEach(quantity => {
            if (quantity == "" || !quantity.match(/^[0-9]+$/)){
              reject('The quantity of ' + ingredients[i] + ' is not a number')
            } else {
              dict.push({
                  ingredient: ingredients[i],
                  amount: parseInt(quantity),
                  unit: units[i]
              });
              i = i + 1;
            }
          });
        }
        
        list_of_ing =  []

        if (dict.length > 0) {
          dict.forEach(item => {
            dico = {
              "ingredient":{
                "$elemMatch": {
                  "name": item.ingredient.toLowerCase(),
                  "amount" : {'$lte' : parseInt(item.amount)}
                }
              }
            };
            list_of_ing.push(dico);
          });
        }

        switch(dict.length){
          case 0:
            return resolve([])
          case 1:
            var query = [
              {
                '$match': list_of_ing[0]
              }
            ]
            break;
          default:
            var query = [
              {
                '$match': {
                  '$and': list_of_ing
                }
              }
            ]
        }

        dbo.collection("recipes").aggregate(query).toArray(function(err, result) {
          if (err) reject(err);
          db.close();
          resolve(result)
        })
      });
    });
  }
,
  openDB: function (){
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database('./DB.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          reject(err.message);
        }
        resolve(db)
      });
    });
  }
,
  getAllIngredients: function (db){
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all(`SELECT ingredients.id as id, ingredients.name as name, categories.name as cat_name
                  FROM ingredients LEFT JOIN categories ON categories.ID = ingredients.Fk_category`, (err, rows) => {
          if (err) {
            reject(err.message);
          }
          allingredients = []
          rows.forEach(row => {
            ingredient = {
              id: row.id,
              name: row.name,
              category: row.cat_name
            }
            allingredients.push(ingredient);
          })
          resolve(allingredients);          
        });
      });
    });
  }
,
  closeDB: function (db){
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed database connection.');
    });
  }
};