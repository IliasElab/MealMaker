import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Ingredient from './Ingredient';

const listReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            if (!state.includes(action.ingredient)){
                return [...state, action.ingredient ];
            }     
            return state
        case 'REMOVE_ITEM':
            return state.filter((ingredient) => ingredient.id === action.ingredient.id)
        default:
            throw new Error();
    }
};

const Ingredients = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedIngredient, dispatchSelectedIngredient] = useReducer(listReducer, []);

    useEffect(() => {
        axios.get('http://localhost:5000/')
        .then((result) => {
            setData(result.data);
        })
    }, []);

    return (
        <div className ='page-ingredients'>
            <select id="type" onChange={((e) => setCategory(e.target.value))}>
                <option>-- Choose a category of Ingredient --</option>

                {[...new Set(data.map(ingredient => ingredient.category))].map((category) => {
                    return (<option key={category}>{category}</option>)
                })}

            </select>

            <div className="selector-ingredients">
                {data.filter((ingredient) => ingredient.category === category).map((ingredient) => (
                    <button key={ingredient.name} onClick={() => dispatchSelectedIngredient({ type: 'ADD_ITEM', ingredient: ingredient})} className="ingredient"><Ingredient ingredient={ingredient}/></button> 
                ))}
            </div>
            
            <div className="selected-ingredients">
                {selectedIngredient.map((ingredient) => ingredient.name)}
            </div>
            
        </div>
    );
};

export default Ingredients;