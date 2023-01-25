import React, {useEffect} from "react";
import {Link, Navigate, BrowserRouter as Redirect} from "react-router-dom";
import { redirect } from "react-router-dom";
import './Login.css';

function LoginForm({user, login, setRegistered, auth}) {

    return(
        <div className="Login-Body">
            <h1>Login</h1>
            <div className="Button-Row">
                <input type="text" className="inputText" placeholder="Email" id="loginEmail"/>
            </div>
            <div className="Button-Row">
                <input type="password" className="inputText" placeholder="Password" id="loginPassword"/>
            </div>
            <button className="Login-Button" onClick={login}>LOG IN</button>
            <p>Not a member yet ?<a onClick={() => setRegistered(false)}> Sign Up</a></p>
            {user && <Navigate to={'/dnd-app/CharacterSelect'}></Navigate>}
        </div>
    );
}

export default LoginForm;