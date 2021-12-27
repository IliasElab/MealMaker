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

                <h4>Preparation</h4>     
                <ul>
                    {recipe.step.split('.').map((step) => {
                        if (step.trim().length) {
                            return(<li>{step}</li>)
                        }
                        return ""
                    })}
                </ul> 
                <img src={"/images/" + recipe._id + ".jpg"} alt="No pictures available" height="400" width="400"/>   
            </div>
        </div>
    );
};

export default Recipe;