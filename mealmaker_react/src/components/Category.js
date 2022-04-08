import React from 'react';

const Category = (props) => {
    const { category } = props;

    return (
        <div className='select-category'>
            <input type="radio" className='input-select-category' value={category} id={category} checked={category === props.actual_category} onChange={(e) => {props.change(e.target.value)}}/>
            <label htmlFor={category}><img alt='Not Found' height="50" width="50" src={"/images/Ingredient_Type/" + category + ".svg"}/><br/>{category}</label>        
        </div>
    );
};

export default Category;