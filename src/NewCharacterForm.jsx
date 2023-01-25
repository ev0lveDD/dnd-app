import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import './Components/Login.css';
import './CharacterSelect.css';
import Race from "./Race";
import Class from "./Class";
import StandardSelector from "./StandardSelector";

function NewCharacterForm({showNewCharacterForm, newCharOpen, createCharacter, uploadImage, setImageUpload}){


    return(
        <div className="Character-Form" style={{display: newCharOpen ? 'flex' : 'none'}}>
        <div className="Character-Form-Top-Bar">
            <button className="Back-Arrow" onClick={showNewCharacterForm}><i className='fas fa-angle-left'></i></button>
            <p>Character Creation Form</p>
        </div>
        <div className="Character-Form-Body">
            <div className="Char-Form-Row">
                <label htmlFor="name">Name: </label>
                <input type="text" className="inputText" placeholder="Name" id="nameForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="race">Race: </label>
                <Race />
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="race">Class: </label>
                <Class />
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="armorClass">Armor Class: </label>
                <StandardSelector name="armorClassForm" id="armorClassForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="level">Level: </label>
                <StandardSelector name="levelForm" id="levelForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="race">Avatar: </label>
                <input type="file" className="inputText" onChange={(event) => {setImageUpload(event.target.files[0]);}}></input>
                <button onClick={uploadImage}>UPLOAD</button>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Health Points">Health Points: </label>
                <input type="number" className="inputText" placeholder="0" id="healthPointsForm" min="1"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Walking Speed">Walking Speed in Ft. : </label>
                <input type="number" className="inputText" placeholder="0" id="walkingSpeedForm" min="1"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Darkvision">Darkvision in Ft. : </label>
                <input type="number" className="inputText" placeholder="0" id="darkvisionForm" min="1"/>
            </div>
            <h1>Statistics</h1>
            <div className="Char-Form-Row">
                <label htmlFor="Strength Value">Strength Value: </label>
                <StandardSelector name="strengthValueForm" id="strengthValueForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Dexterity Value">Dexterity Value: </label>
                <StandardSelector name="dexterityValueForm" id="dexterityValueForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Constitution Value">Constitution Value: </label>
                <StandardSelector name="constitutionValueForm" id="constitutionValueForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Intelligence Value">Intelligence Value: </label>
                <StandardSelector name="intelligenceValueForm" id="intelligenceValueForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Wisdom Value">Wisdom Value: </label>
                <StandardSelector name="wisdomValueForm" id="wisdomValueForm"/>
            </div>
            <div className="Char-Form-Row">
                <label htmlFor="Charisma Value">Charisma Value: </label>
                <StandardSelector name="charismaValueForm" id="charismaValueForm"/>
            </div>
            <button className="New-Char-Submit" onClick={createCharacter}><h3>CREATE CHARACTER</h3></button>
        </div>
    </div>
    );
}

export default NewCharacterForm;