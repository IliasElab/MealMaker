import React from 'react';

const Ingredient = (props) => {
    const { ingredient } = props;

    return (
        <div className="ingredient" key={ingredient.id}>{ingredient.name}</div>
    );
};

export default Ingredient;