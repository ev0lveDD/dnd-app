import React from "react";
import {Link, Navigate} from "react-router-dom";
import './Login.css';

function RegisterForm({user, register, setRegistered}) {
    return(
        <div className="Login-Body">
            <h1>Register</h1>
            <div className="Button-Row">
                <input type="text" className="inputText" placeholder="Email" id="registerEmail"/>
            </div>
            <div className="Button-Row">
                <input type="password" className="inputText" placeholder="Password" id="registerPassword"/>
            </div>
            <button className="Login-Button" onClick={register}>REGISTER</button>
            <p>Already a member ?<a onClick={() => setRegistered(true)}> Sign In</a></p>
            {user && <Navigate to={'/dnd-app/CharacterSelect'}></Navigate>}
        </div>
    );
}

export default RegisterForm;