import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import { useLocation } from 'react-router-dom';

const ListRecipes = () => {
    
    const { state } = useLocation();
    const [allRecipes, setAllRecipes] = useState(state === null ? true : false);
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const recipeTypes = ["Cakes", "Pies", "Cookies", "Salads and Dressings"];

    useEffect(() => {
        if (state === null || allRecipes === true){
            axios.get('http://localhost:5000/meals/all')
            .then((result) => {
                setData(result.data);
            })
        } else {
            axios.get('http://localhost:5000/meals/', {params: state})
            .then((result) => {
                setData(result.data);
            })
        }   
    }, [allRecipes]);

    return (
        <div className="list-recipes">
            <ul className='categories'>
                {selectedRecipe === "" && recipeTypes.map((type) => {
                    return(
                        <li key={type}>
                            <input type="radio" value={type} id={type} checked={type === selectedType} onChange={(e) => {setSelectedType(e.target.value); setSelectedRecipe("");}}/>
                            <label htmlFor={type}>{type}</label>
                        </li>
                    )
                })}
            </ul>
            <div className="cancel">
                {selectedRecipe === "" && selectedType && <button onClick={() => {setSelectedType(""); setSelectedRecipe("");}}>Reset Categories</button>}
                {(selectedRecipe !== "" || allRecipes === false) && <button onClick={() => {setSelectedType(""); setSelectedRecipe(""); setAllRecipes(true)}}>All Recipes</button>}
            </div>

            {selectedRecipe === "" && <ul className="filtered-recipes">
                {data.filter((recipe) => recipe.category.includes(selectedType)).map((recipe) => (
                    <button className="recipe" key={recipe.title} onClick={() => {setSelectedRecipe(recipe._id); setSelectedType("recipe-selected");
                    }}>{recipe.title}</button> 
                ))}
            </ul>}

            {selectedRecipe !== "" && <Recipe recipe={data.find((recipe) => recipe._id === selectedRecipe)} key={selectedRecipe}/>}

        </div>
        
    );
};

export default ListRecipes;