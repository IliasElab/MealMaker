const sqlite3 = require('sqlite3').verbose();
var MongoClient = require('mongodb').MongoClient;
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
        var query = { name: recipe };
        console.log(query)
        dbo.collection("recipes").findOne(query, function(err, result) {
          if (err) reject(err);
          db.close();
          console.log(result)
          resolve(result)
        });
      });
    });
  }
,
  Mongo_GetMatchingRecipes: function(ingredients){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("MealMaker");
        if (typeof ingredients === 'string'){
          ingredients = [ingredients]
        }
        var query = { "ingredient.name": {$in : ingredients}  };
        console.log(query)
        dbo.collection("recipes").find(query).toArray(function(err, result) {
            db.close();
            resolve(result)
        });
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