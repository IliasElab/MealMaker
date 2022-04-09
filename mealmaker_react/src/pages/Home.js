import React from 'react';
import Ingredients from '../components/Ingredients';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div id='All-page'>
            <div id='Navbar'>
                <Navigation />
            </div>
            <div id='body-container'>
                <h1>Welcome on MealMaker</h1>
                <p>Enter what ingredients you have to see what meals you can make with !</p>

                <Ingredients />
            </div>   
        </div>
    );
};

export default Home;