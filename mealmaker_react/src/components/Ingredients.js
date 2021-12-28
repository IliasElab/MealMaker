import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredient from './Ingredient';

const Ingredients = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');

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
                    <Ingredient ingredient={ingredient} key={ingredient.name}/>
                ))}
            </div>
            
            <div className="selected-ingredients"></div>
            
        </div>
    );
};

export default Ingredients;