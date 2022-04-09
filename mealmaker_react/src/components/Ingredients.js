import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Ingredient from './Ingredient';
import { useNavigate } from 'react-router-dom';
import Category from './Category';

const units = ['g', 'Nb', 'tbsp', 'cl'];

const listReducer = (state, action) => {
    let updated;
    switch (action.type) {
        case 'ADD_ITEM':
            if(state.find((elem) => elem.id === action.ingredient.id) === undefined){
                const ing = {...action.ingredient, amount: NaN, unit: 'g'};
                return [...state, ing ];
            }
            return state
        case 'REMOVE_ITEM':
            return state.filter((ingredient) => ingredient.id !== action.remove_id);
        case 'MODIFY_AMOUNT_ITEM':
            updated = state.map((ing) => {
                if (ing.id === action.modify_id){
                    try {
                        if (action.amount > 0)
                            return {...ing, "amount": parseInt(action.amount)}
                        else 
                            {return {...ing, "amount": NaN}}
                        
                    } catch (error) {  
                        console.log(error)
                        {return ing}
                    }
                }
                else {return ing}
            });
            return updated
        case 'MODIFY_UNIT_ITEM':
            updated = state.map((ing) => {
                if (ing.id === action.modify_id && units.includes(action.unit))
                    return {...ing, "unit": action.unit}
                return ing
            });
            return updated
        case 'EMPTY_ITEM':
            return [];
        default:
            throw new Error();
    }
};

const Ingredients = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState();
    const [selectedIngredient, dispatchSelectedIngredient] = useReducer(listReducer, []);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/')
        .then((result) => {
            setData(result.data);
        })
    }, []);

    return (
        <div id ='page-ingredients'>
            <div id='body-content'>
                <div id='all-select-categories'>
                    
                    {[...new Set(data.map(ingredient => ingredient.category))].map((cat) => 
                        <Category key={cat} category={cat} actual_category={category} change={setCategory} />
                    )}

                </div>

                <div className="selector-ingredients">
                    {data.filter((ingredient) => ingredient.category === category).map((ingredient) => {
                        if (selectedIngredient.find((ing) => ing.id === ingredient.id)){
                            return <button key={ingredient.name} className='btn-selected' onClick={() => dispatchSelectedIngredient({ type: 'REMOVE_ITEM', remove_id: ingredient.id })}>{ingredient.name}</button> 
                        }
                        else {
                            return <button key={ingredient.name} className='btn-unselected' onClick={() => dispatchSelectedIngredient({ type: 'ADD_ITEM', ingredient: ingredient})}>{ingredient.name}</button> 
                        }
                    })}
                </div>
            </div>
            
            <div id='side-content' style={{display: selectedIngredient.length === 0 ? 'none' : ''}}>
                <div className="selected-ingredients">
                    {selectedIngredient.map((ingredient) =>
                        <Ingredient key={ingredient.name} ingredient={ingredient} change={dispatchSelectedIngredient}/>
                    )}
                </div>
                
                <div className="functionnal-btn">            
                    {selectedIngredient.length !== 0 && <button onClick={() => dispatchSelectedIngredient({type: 'EMPTY_ITEM'})} className='delete-all'>Empty List</button>}
                    {selectedIngredient.length !== 0 && selectedIngredient.every((ing) => !isNaN(ing.amount)) && (<button className='fit-recipes' onClick={() => navigate('/recipes', {state: selectedIngredient})}>Find Recipes</button>)}
                </div>
            </div>
        </div>
    );
};

export default Ingredients;