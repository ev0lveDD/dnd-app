import React, {useState} from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase-config";
import './Login.css';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Login({user, auth}) {
    
    const [registered, setRegistered] = useState(true);

    const logout = async () => {
        await signOut(auth);
      }

    const register = async () => {
        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;
        try{
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
                );
            console.log(user);
        }
        catch(error){
            console.log(error.message);
        }
      }
    
      const login = async () => {
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        try{
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
                );
            console.log(user);
            console.log();
        }
        catch(error){
            console.log(error.message);
        }
      }

    return(
        <div className="Login-Body">
        {registered ? <LoginForm user={user} login={login} setRegistered={setRegistered}/> : <RegisterForm user={user} register={register} setRegistered={setRegistered}/>}
        </div>
    )
}

export default Login;
