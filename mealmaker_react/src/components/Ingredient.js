import React from 'react';

const Ingredient = (props) => {
    const units = ['g', 'Nb', 'tbsp', 'cl'];
    const { ingredient } = props;
    
    return (
        <div className="selected-ingredient">
            <div className="button-label">
                <button onClick={() => props.change({ type: 'REMOVE_ITEM', remove_id: ingredient.id })}>-</button>
                <label>{ingredient.name}</label> 
            </div>
            <input required onChange={(e) => props.change({ type: 'MODIFY_AMOUNT_ITEM', modify_id: ingredient.id, amount: e.target.value })} placeholder='0' min="1" type="number" className="ingredient-amount" name="amount"></input>
            <select onChange={(e) => props.change({ type: 'MODIFY_UNIT_ITEM', modify_id: ingredient.id, unit: e.target.value })} name="unit" id="" className="ingredient-select">
                {units.map((unit) => {
                    return (<option value={unit} key={ingredient.name + '-' + unit}>{unit}</option>)
                })}
            </select>
        </div>
    );
};

export default Ingredient;