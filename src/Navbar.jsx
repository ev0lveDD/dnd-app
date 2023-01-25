import React, {useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import './Navbar.css';

function Navbar( {newCharacter} ) {
    const {id} = useParams();
    return(
        <nav className="Nav">
        <ul>
            <li className="active">
                <Link to={`/dnd-app/Character/${id}`}>Abilities</Link>
            </li>
            <li>
                <Link to={`/dnd-app/Character/${id}/Inventory`}>Inventory</Link>
            </li>
        </ul>
        </nav>  
    )
}

export default Navbar;