import React from 'react';
import ListRecipes from '../components/ListRecipes';
import Navigation from '../components/Navigation';

const ShowRecipes = () => {
    return (
        <div>
            <Navigation />
            <ListRecipes />
            <h3>Je suis le component ShowRecipes</h3>
        </div>
    );
};

export default ShowRecipes;