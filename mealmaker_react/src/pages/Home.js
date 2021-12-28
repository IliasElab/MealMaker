import React from 'react';
import Ingredients from '../components/Ingredients';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div>
        <Navigation />
        <h1>Welcome on MealMaker</h1>
        <p>Enter what ingredients you have to see what meals you can make with !</p>

        <Ingredients />

        </div>
    );
};

export default Home;