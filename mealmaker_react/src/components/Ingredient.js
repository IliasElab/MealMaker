import React from 'react';

const Ingredient = (props) => {
    const units = ['g', 'Nb', 'tbsp', 'cl'];
    const { ingredient } = props;
    
    return (
        <div className="selected-ingredient">
            <button  onClick={() => props.change({ type: 'REMOVE_ITEM', remove_id: ingredient.id })}>-</button>
            <input type="number" className="ingredient"></input>
            <select name="" id="">
                <option>-- Choose a Unit --</option>
                {units.map((unit) => {
                    return (<option key={ingredient.name + '-' + unit}>{unit}</option>)
                })}
            </select>
        </div>



    );
};

export default Ingredient;