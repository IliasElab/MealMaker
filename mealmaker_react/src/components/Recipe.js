import React from 'react';

const Recipe = (props) => {
    const { recipe } = props;

    return (
        <div className="container-recipe">
            <h2>{recipe.title}</h2>
            <div>
                <h4>All Ingredients</h4>

                <ul>
                    {recipe.ingredient.map(ingredient => {
                        let showedIngredient = "";
                        if(ingredient.amount !== 0 && ingredient.unit !== "number"){
                            showedIngredient = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1) + ' : ' + ingredient.amount + ' ' + ingredient.unit;
                        }
                        else if (ingredient.amount !== 0 && ingredient.unit === "number"){
                            showedIngredient = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1) + ' : ' + ingredient.amount;
                        }
                        else {
                            showedIngredient = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
                        }
                        return (
                        <li key={ingredient.name}>{showedIngredient}</li>
                        ) 
                    })}
                </ul>     
            </div>
        </div>
    );
};

export default Recipe;