import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

    function showDD() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    
    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("myDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }

    return (
        <div className="navigation">
        
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/">
                    <img src="/home.png" alt="" width="60" height="60"/>
                </NavLink>

                <NavLink to="/meals/all">
                    All Recipes
                </NavLink>

                <div>  
                    <div class="typelist">
                        <button class="dropbtn" onclick={() => showDD()}>Dropdown</button>
                        <div class="typelist-content" id="myDropdown">
                            <a href="/meals/category/Cakes">Cakes</a>
                            <a href="/meals/category/Pies">Pies</a>
                            <a href="/meals/category/Cookies">Cookies</a>
                            <a href="/meals/category/Salads_and_Dressings">Salads and Dressings</a>
                        </div>
                    </div> 
                </div>
            </nav>
        </div>
    );
};

export default Navigation;