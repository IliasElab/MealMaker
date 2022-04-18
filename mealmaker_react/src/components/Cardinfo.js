import React from 'react';

const Cardinfo = (props) => {
    return (
        <div className='cardinfo'>
            <img src={"/images/" + props.name + ".svg"} alt='Not Found'/>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
};

export default Cardinfo;