import React, {useState} from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase-config";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import defaultAvatar from "./Images/cleric.jpg";
import Navbar from "./Navbar";
import Inventory from "./Inventory";
import Stats from "./Stats";
import {Link, Route, Routes} from "react-router-dom";

function CharacterSheet({loading, edit, setEdit, updateCharacter, showHPForm, playerInfo, playerInfoDown, playerInfoUp, isOpen, healthDown, healthUp, proficiencyBonus, statBonus, statValue, statUp, statDown, checkBonusSign, checkProficiency, newCharacter, currency, addCurrency, removeCurrency}) {
   
    
    const navigate = useNavigate();

    const imageListRef = ref(storage, "images/");
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, [])

    return(
        <div className="app-body">
            {loading ? <div>...loading</div> : <div>
             <div className="Avatar-Image">
             {imageList.map((url, index) => {
                if(url.includes(newCharacter.imageURL)){
                    return <img key={index}className="avatar" src={url}/>
                } else {
                }
                    })}
            {newCharacter.imageURL==null && <img src={defaultAvatar}/>}
            </div>
        <div className="header">
            <div className="Header-Top">
                <div className="Header-Top-Left">
                    <button className="Back-Arrow-Character" onClick={() => navigate(-1)}><i className='fas fa-angle-left'></i></button>
                </div>
                <div className="Header-Top-Right">
                    {edit ?  <button className="Settings-Button" onClick={() => {updateCharacter(newCharacter.id)}}><i className="fa-solid fa-floppy-disk Settings-Icon"></i></button> : <button className="Settings-Button" onClick={() => {setEdit(true)}}><i className="fa-solid fa-gear Settings-Icon"></i></button>}
                    <div className="Health">
                        <progress className="Health-Bar" onClick={showHPForm} id="health" value={playerInfo.currentHP} max={playerInfo.maxHP}></progress>
                        <button className="Heart-Button" onClick={showHPForm}><i className="fa-regular fa-heart Settings-Icon"><h5>{playerInfo.currentHP}/{playerInfo.maxHP}</h5></i></button>
                    </div>
                    {edit && <div>
                            <button className="stat-button-small" name="maxHP" onClick={playerInfoUp}>+</button>
                            <button className="stat-button-small" name="maxHP" onClick={playerInfoDown}>-</button>
                        </div>}
                </div>
            </div>
            <div className="Health-Form" style={{display: isOpen ? 'flex' : 'none'}}>
                <div className="Health-Form-Top-Bar">
                    <button className="Back-Arrow" onClick={showHPForm}><i className='fas fa-angle-left'></i></button>
                    <p>HP Management</p>
                </div>
                <div className="Health-Form-Health-Bar">
                    <div className="Health-Form-Health-Bar-Left">
                        <h1>{playerInfo.currentHP}</h1>
                        <p>CURRENT HP</p>
                    </div>
                    <h1 className="Splitter">/</h1>
                    <div className="Health-Form-Health-Bar-Right">
                        <h1>{playerInfo.maxHP}</h1>
                        <p>MAX HP</p>
                    </div>
                </div>
                <div className="Health-Form-Health-Buttons">
                    <button onClick={healthUp}>HEAL</button>
                    <input type="number" name="health-pool" id="health-pool" min="1"></input>
                    <button className="Damage-Button" onClick={healthDown}>DAMAGE</button>
                </div>
            </div>
            <div className="Header-Bottom-Left">
                {edit && <div>
                    <button className="stat-button-small" name="level" onClick={playerInfoUp}>+</button>
                    <button className="stat-button-small" name="level" onClick={playerInfoDown}>-</button></div>}
                <p>LEVEL: {playerInfo.level}</p>
                <h1>{newCharacter.name}</h1>
                <p>{newCharacter.race} · {newCharacter.class}</p>
            </div>
        </div>
        <div className="bottom-stats">
                <div className="bottom-stats-container">
                    <h3>+{proficiencyBonus}</h3>
                    <p>PROF. BONUS</p>
                </div>
                <div className="bottom-stats-container">
                    <h3>{playerInfo.walkingSpeed} <p>FT.</p></h3>
                    <p>WALKING SPEED</p>
                    {edit && <div>
                        <button className="stat-button-small" name="walkingSpeed" onClick={playerInfoUp}>+</button>
                        <button className="stat-button-small" name="walkingSpeed" onClick={playerInfoDown}>-</button>
                    </div>}
                </div>
                <div className="bottom-stats-container">
                    <h3>+{statBonus.dexterityBonus}</h3>
                    <p>INITIATIVE</p>
                </div>
                <div className="bottom-stats-container">
                    <h3>{playerInfo.armorClass}</h3>
                    <p>ARMOR CLASS</p>
                    {edit && <div>
                        <button className="stat-button-small" name="armorClass" onClick={playerInfoUp}>+</button>
                        <button className="stat-button-small" name="armorClass" onClick={playerInfoDown}>-</button>
                    </div>}
                </div>
            </div>
        <Navbar newCharacter={newCharacter}/>
        <Routes>
        <Route path="/" 
        element={<Stats 
        loading={loading} 
        statValue={statValue}
        statBonus={statBonus}
        statUp ={statUp}
        statDown={statDown}
        edit={edit}
        checkBonusSign={checkBonusSign}
        proficiencyBonus={proficiencyBonus}
        newCharacter={newCharacter}
        checkProficiency={checkProficiency}
        />} 
        />
        <Route path="/Inventory" element={<Inventory currency={currency} addCurrency={addCurrency} removeCurrency={removeCurrency}/>} />
        </Routes>
        </div>}
        </div>
    );
}

export default CharacterSheet;