import React from 'react';
import Ingredients from '../components/Ingredients';
import Navigation from '../components/Navigation';
import Cardinfo from '../components/Cardinfo';

const cardinfos = [{name: 'Trash-Can', title: 'Greatly reduce food waste', content: "Use the food you have to make great meals and don't let the food rot in the storage"},
                   {name: 'Money', title: 'Reduce money spending', content: 'No need to buy ingredients when you already can make lunches with what you have'}
]

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

                <div id ='cards-container'>
                    {cardinfos.map((elem) =><Cardinfo key={elem.name} name={elem.name} title={elem.title} content={elem.content}/>)}
                </div>
            </div>   
        </div>
    );
};

export default Home;