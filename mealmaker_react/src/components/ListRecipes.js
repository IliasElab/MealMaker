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
            <ul className='recipes-categories'>
                {selectedRecipe === "" && 
                    <li key="all">
                        <input type="radio" value="all" id="all" checked={"" === selectedType} onChange={() => {setSelectedType(""); setSelectedRecipe("");}}/>
                        <label htmlFor="all"><img alt='Not Found' height="45" width="45" src="/images/AllRecipes.svg"/> <br/>All Categories</label>
                    </li>
                }

                {selectedRecipe === "" && recipeTypes.map((type) => {
                    return(
                        <li key={type}>
                            <input type="radio" value={type} id={type} checked={type === selectedType} onChange={(e) => {setSelectedType(e.target.value); setSelectedRecipe("");}}/>
                            <label htmlFor={type}><img alt='Not Found' height="45" width="45" src={"/images/" + type + ".svg"}/> <br/> {type}</label>
                        </li>
                    )
                })}
            </ul>
            
                {(selectedRecipe === "" && allRecipes === false) && <div className="cancel">
                <button id='reset' onClick={() => {setSelectedType(""); setSelectedRecipe(""); setAllRecipes(true)}}></button>
                <label htmlFor='reset'><br/>All Recipes</label>
            </div>}

            {selectedRecipe === "" && <ul className="filtered-recipes">
                {data.filter((recipe) => recipe.category.includes(selectedType)).map((recipe) => (
                    <button className="recipe" key={recipe.title} onClick={() => {setSelectedRecipe(recipe._id);
                    }}>{recipe.title}</button> 
                ))}
            </ul>}
            
            {selectedRecipe !== "" && <div className="recipe-elements"> 
                <button id='back-to-filtered' onClick={() => {setSelectedRecipe("");}}></button>
                <Recipe recipe={data.find((recipe) => recipe._id === selectedRecipe)} key={selectedRecipe}/>
            </div>}
        </div>
    );
};

export default ListRecipes;