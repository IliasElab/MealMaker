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
  Mongo_ByCategories: function(body){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("MealMaker");
        if (body.includes("_")){
          body = body.split('_').join(' ')
        }
        var query = { category: body };
        dbo.collection("recipes").find(query).toArray(function(err, result) {
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
        if (err || body.length === 0) reject(err);
        var dbo = db.db("MealMaker");

        var dict = body.map(ing => {
          let ing_formatted = JSON.parse(ing);
          if (ing_formatted.amount == "" || typeof ing_formatted.amount === 'string' ){
            reject('The amount of ' + ing_formatted.name + ' is not a number')
          }

          dico = {
            "ingredient":{
              "$elemMatch": {
                "name": ing_formatted.name.toLowerCase(),
                "amount" : {'$lte' : parseInt(ing_formatted.amount)}
              }
            }
          };
          return dico;
        })
        
        switch(dict.length){
          case 0:
            return resolve([])
          case 1:
            var query = [
              {
                '$match': dict[0]
              }
            ]
            break;
          default:
            var query = [
              {
                '$match': {
                  '$and': dict
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