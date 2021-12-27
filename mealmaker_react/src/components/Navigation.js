import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/">
                    <img src="/home.png" alt="" width="60" height="60"/>
                </NavLink>

                <NavLink to="/recipes">
                    See Recipes
                </NavLink>
            </nav>
        </div>
    );
};

export default Navigation;