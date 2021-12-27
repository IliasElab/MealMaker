import React from 'react';
import ListRecipes from '../components/ListRecipes';
import Navigation from '../components/Navigation';

const ShowRecipes = () => {
    return (
        <div>
            <Navigation />
            <ListRecipes />
        </div>
    );
};

export default ShowRecipes;