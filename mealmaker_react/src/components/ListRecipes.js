import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListRecipes = () => {
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const recipeTypes = ["Cakes", "Pies", "Cookies", "Salads and Dressings"];

    useEffect(() => {
        axios.get('http://localhost:5000/meals/all')
        .then((result) => {
            console.log(result);
            //setData(result.data);
        }) 
    }, []);

    return (
        <div className="list-recipes">
            <ul>
                {recipeTypes.map((type) => {
                    return(
                        <li key={type}>
                            <input type="radio" value={type} id={type} checked={type === selectedType} onChange={(e) => setSelectedType(e.target.value)}/>
                            <label htmlFor={type}>{type}</label>
                        </li>
                    )
                })}
            </ul>
            <div className="cancel">
                {selectedType && <button onClick={() => setSelectedType("")}>All Recipes</button>}
            </div>
        </div>
        
    );
};

export default ListRecipes;