import React from 'react';

const Ingredient = (props) => {
    const { ingredient } = props;

    return (
        <div className="ingredient">
            <button className="button-ingredient" key={ingredient.id}>{ingredient.name}</button>
        </div>
    );
};

export default Ingredient;