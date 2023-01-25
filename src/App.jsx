import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import { useLocation, useParams } from 'react-router-dom';
import "./App.css";
import SkillsTableRow from "./SkillsTableRow";
import StatContainer from "./StatContainer";
import SavingThrow from "./SavingThrow";
import Sense from "./Sense";
import {Link, Route, Routes, Navigate} from "react-router-dom";
import { db, auth } from "./firebase-config";
import { collection, getDocs, updateDoc, doc, CollectionReference, addDoc, deleteDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Login from "./Components/Login";
import CharacterSelect from "./CharacterSelect";
import CharacterSheet from "./CharacterSheet";
import ItemModal from "./ItemModal";

function App(){
    let {id} = useParams();
    const [edit, setEdit] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [newCharacter, setNewCharacter] = useState();
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        await getDocs(collection(db, "characters"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setCharacters(newData);                
                console.log(characters, newData);
            })
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    const getCharacter = async (id) => {
        await getDoc(doc(db, "characters", id))
        .then((doc) => {
            const newData = doc.data();
            setNewCharacter(newData);    
            setLoading(false);
            console.log(newCharacter, newData);
            console.log(newData.name);
            setStatValue(() => {
                return {
                    strengthValue: newData.strengthValue,
                    dexterityValue: newData.dexterityValue,
                    constitutionValue: newData.constitutionValue,
                    intelligenceValue: newData.intelligenceValue,
                    wisdomValue: newData.wisdomValue,
                    charismaValue: newData.charismaValue,
                }
            })
             setPlayerInfo(() => {
                return {
                    level: newData.level,
                    currentHP: newData.currentHP,
                    maxHP: newData.maxHP,
                    armorClass: newData.armorClass,
                    walkingSpeed: newData.walkingSpeed,
                }
            })
            setCurrency(() => {
                return {
                    copperAmmount: newData.copperAmmount,
                    silverAmmount: newData.silverAmmount,
                    goldAmmount: newData.goldAmmount,
                    platinumAmmount: newData.platinumAmmount,
                }
            })
        })
    }
    const location = useLocation();
    
    const updateCharacter = async (id) => {
        const userDoc = doc(db, "characters", id);
        if(location.pathname.includes('/Inventory')){
            const newFields = {
                copperAmmount: currency.copperAmmount,
                silverAmmount: currency.silverAmmount,
                goldAmmount: currency.goldAmmount,
                platinumAmmount: currency.platinumAmmount,
            }
            await updateDoc(userDoc, newFields);
        } else {
        const newFields = {
            strengthValue: statValue.strengthValue,
            dexterityValue: statValue.dexterityValue,
            constitutionValue: statValue.constitutionValue,
            intelligenceValue: statValue.intelligenceValue,
            wisdomValue: statValue.wisdomValue,
            charismaValue: statValue.charismaValue,
            armorClass: playerInfo.armorClass,
            level: playerInfo.level,
            currentHP: playerInfo.currentHP,
            maxHP: playerInfo.maxHP,
            walkingSpeed: playerInfo.walkingSpeed,
            Acrobatics: document.getElementById("Acrobatics").checked,
            AnimalHandling: document.getElementById("Animal Handling").checked,
            Arcana: document.getElementById("Arcana").checked,
            Athletics: document.getElementById("Athletics").checked,
            Deception: document.getElementById("Deception").checked,
            History: document.getElementById("History").checked,
            Insight: document.getElementById("Insight").checked,
            Intimidation: document.getElementById("Intimidation").checked,
            Investigation: document.getElementById("Investigation").checked,
            Medicine: document.getElementById("Medicine").checked,
            Nature: document.getElementById("Nature").checked,
            Perception: document.getElementById("Perception").checked,
            Performance: document.getElementById("Performance").checked,
            Persuasion: document.getElementById("Persuasion").checked,
            Religion: document.getElementById("Religion").checked,
            SleightOfHand: document.getElementById("Sleight of hand").checked,
            Stealth: document.getElementById("Stealth").checked,
            Survival: document.getElementById("Survival").checked,
            charismaSave: document.getElementById("charismaSave").checked,
            constitutionSave: document.getElementById("constitutionSave").checked,
            dexteritySave: document.getElementById("dexteritySave").checked,
            intelligenceSave: document.getElementById("intelligenceSave").checked,
            strengthSave: document.getElementById("strengthSave").checked,
            wisdomSave: document.getElementById("wisdomSave").checked,
        }
        await updateDoc(userDoc, newFields);
    }
    setEdit(false);
    }

    const [statValue, setStatValue] = useState({
        strengthValue: 0,
        dexterityValue: 0,
        constitutionValue: 0,
        intelligenceValue: 0,
        wisdomValue: 0,
        charismaValue: 0,
    });

    const [statBonus, setStatBonus] = useState({
        strengthBonus: 0,
        dexterityBonus: 0,
        constitutionBonus: 0,
        intelligenceBonus: 0,
        wisdomBonus: 0,
        charismaBonus: 0
    });

    const [playerInfo, setPlayerInfo] = useState({
        level: 0,
        currentHP: 0,
        maxHP: 0,
        armorClass: 0,
        walkingSpeed: 0,
    });

    const [proficiencyBonus, setproficiencyBonus] = useState(2);

    useEffect(() => {
        if(playerInfo.level<=4){
            setproficiencyBonus(2);
        } else if(playerInfo.level<=8){
            setproficiencyBonus(3);
        } else if(playerInfo.level<=12){
            setproficiencyBonus(4);
        } else if(playerInfo.level<=16){
            setproficiencyBonus(5);
        } else{
            setproficiencyBonus(6);
        }
    },[playerInfo])

    
    function checkBonusValue(value){
        if(value<=1){
            return(-5);
        } else if(value<=3){
            return(-4);
        } else if(value<=5){
            return(-3);
        } else if(value<=7){
            return(-2);
        } else if(value<=9){
            return(-1);
        } else if(value<=11){
            return(0);
        } else if(value<=13){
            return(1);
        } else if(value<=15){
            return(2);
        } else if(value<=17){
            return(3);
        } else if(value<=19){
            return(4);
        } else if(value>=20){
            return(5);
        }
    }

    useEffect(() => {
        const strengthData = checkBonusValue(statValue.strengthValue);
        const dexterityData = checkBonusValue(statValue.dexterityValue);
        const constitutionData = checkBonusValue(statValue.constitutionValue);
        const intelligenceData = checkBonusValue(statValue.intelligenceValue);
        const wisdomData = checkBonusValue(statValue.wisdomValue);
        const charismaData = checkBonusValue(statValue.charismaValue);
        setStatBonus(prevValue => {
            return {
                strengthBonus: strengthData,
                dexterityBonus: dexterityData,
                constitutionBonus: constitutionData,
                intelligenceBonus: intelligenceData,
                wisdomBonus: wisdomData,
                charismaBonus: charismaData
            }
        })
    },[statValue])

function healthUp(){
    const value = document.getElementById("health-pool").value;
    setPlayerInfo(prevValue => {
        return {
            level: prevValue.level,
            currentHP: Number(prevValue.currentHP)+Number(value),
            maxHP: prevValue.maxHP,
            armorClass: prevValue.armorClass,
            walkingSpeed: prevValue.walkingSpeed
        }
    })
    setTimeout(checkColor, 1500);
}

function healthDown(){
    const value = document.getElementById("health-pool").value;
    setPlayerInfo(prevValue => {
        return {
            level: prevValue.level,
            currentHP: Number(prevValue.currentHP)-Number(value),
            maxHP: prevValue.maxHP,
            armorClass: prevValue.armorClass,
            walkingSpeed: prevValue.walkingSpeed
        }
    })
    setTimeout(checkColor, 1500);
}

function playerInfoUp(event){
    const {name} = event.target;
    switch (name) {
        case 'level':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level+1,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
          break;
        case 'maxHP':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP+1,
                    maxHP: prevValue.maxHP+1,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
        break;
        case 'armorClass':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass+1,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
        break;
        case 'walkingSpeed':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed+1
                }
            })
        break;
      }
}

function playerInfoDown(event){
    const {name} = event.target;
    switch (name) {
        case 'level':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level-1,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
          break;
        case 'maxHP':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP-1,
                    maxHP: prevValue.maxHP-1,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
        break;
        case 'armorClass':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass-1,
                    walkingSpeed: prevValue.walkingSpeed
                }
            })
        break;
        case 'walkingSpeed':
            setPlayerInfo(prevValue => {
                return {
                    level: prevValue.level,
                    currentHP: prevValue.currentHP,
                    maxHP: prevValue.maxHP,
                    armorClass: prevValue.armorClass,
                    walkingSpeed: prevValue.walkingSpeed-1
                }
            })
        break;
      }
}

function statUp(event) {
    const {name} = event.target;
    if(name==="strengthValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue+1,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="dexterityValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue+1,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="constitutionValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue+1,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="intelligenceValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue+1,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="wisdomValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue+1,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="charismaValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue+1
            }
        });
    }
    console.log(statValue);
    console.log(statBonus);
  }

  function statDown(event) {
    const {name} = event.target;
    if(name==="strengthValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue-1,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="dexterityValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue-1,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="constitutionValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue-1,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="intelligenceValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue-1,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="wisdomValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue-1,
                charismaValue: prevValue.charismaValue
            }
        });
    } else if(name==="charismaValue"){
        setStatValue(prevValue => {
            return{
                strengthValue: prevValue.strengthValue,
                dexterityValue: prevValue.dexterityValue,
                constitutionValue: prevValue.constitutionValue,
                intelligenceValue: prevValue.intelligenceValue,
                wisdomValue: prevValue.wisdomValue,
                charismaValue: prevValue.charismaValue-1
            }
        });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  
  function showHPForm(){
    if(isOpen===true){
        setIsOpen(false);
    } else if(isOpen===false){
        setIsOpen(true);
    }
  }

  function checkColor(){
    const element = document.getElementById("health");
        if(playerInfo.currentHP<=playerInfo.maxHP*0.4){
            element.style.setProperty('--healthColor','red');
        } else if(playerInfo.currentHP>=playerInfo.maxHP*0.4 && playerInfo.currentHP<playerInfo.maxHP*0.7){
            element.style.setProperty('--healthColor','orange');
        } else if(playerInfo.currentHP>=playerInfo.maxHP*0.7){
            element.style.setProperty('--healthColor','#01EEB8');
        }
  }

  function checkBonusSign(value){
    var plusSign = "+";
    var minusSign = plusSign.replace("+", "");
    if(value>=0){
        return plusSign;
    } else{
        return minusSign;
    }
  }

  const checkProficiency = (value) => {
    const data = value;
    if(data===true){
        return proficiencyBonus;
    }
    else if(data===false){
        return 0;
    }
  }

  const [user, setUser] = useState({});

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const [currency, setCurrency] = useState({
        copperAmmount: 0,
        silverAmmount: 0,
        goldAmmount: 0,
        platinumAmmount: 0,
    });

    function addCurrency(){
        const copperValue = document.getElementById("copper-ammount").value;
        const silverValue = document.getElementById("silver-ammount").value;
        const goldValue = document.getElementById("gold-ammount").value;
        const platinumValue = document.getElementById("platinum-ammount").value;
        setCurrency(prevValue => {
            return {
                copperAmmount: Number(prevValue.copperAmmount)+Number(copperValue),
                silverAmmount: Number(prevValue.silverAmmount)+Number(silverValue),
                goldAmmount: Number(prevValue.goldAmmount)+Number(goldValue),
                platinumAmmount: Number(prevValue.platinumAmmount)+Number(platinumValue),
            }
        })
    }

    function removeCurrency(){
        const copperValue = document.getElementById("copper-ammount").value;
        const silverValue = document.getElementById("silver-ammount").value;
        const goldValue = document.getElementById("gold-ammount").value;
        const platinumValue = document.getElementById("platinum-ammount").value;
        setCurrency(prevValue => {
            return {
                copperAmmount: Number(prevValue.copperAmmount)-Number(copperValue),
                silverAmmount: Number(prevValue.silverAmmount)-Number(silverValue),
                goldAmmount: Number(prevValue.goldAmmount)-Number(goldValue),
                platinumAmmount: Number(prevValue.platinumAmmount)-Number(platinumValue),
            }
        })
    }

  

  return (
    <div className="app-body">
    <Routes>
      <Route path="/" element={<Login user={user} auth={auth}/>} />
      <Route path="/dnd-app" element={<Login user={user} auth={auth}/>} />
      <Route path="/dnd-app/CharacterSelect" element={<CharacterSelect characters={characters} getCharacter={getCharacter} user={user} auth={auth} fetchPost={fetchPost}/>} />
      <Route path="/dnd-app/Character/:id/*" 
        element={<CharacterSheet 
        loading={loading} 
        edit={edit} 
        setEdit={setEdit} 
        updateCharacter={updateCharacter}
        playerInfo={playerInfo}
        playerInfoDown={playerInfoDown}
        playerInfoUp={playerInfoUp}

        showHPForm={showHPForm}
        isOpen={isOpen}
        healthDown={healthDown}
        healthUp={healthUp}

        proficiencyBonus={proficiencyBonus}
        statBonus={statBonus}
        statValue={statValue}
        statUp={statUp}
        statDown={statDown}
        checkBonusSign={checkBonusSign}
        checkProficiency={checkProficiency}
        newCharacter={newCharacter}
        currency={currency}
        addCurrency={addCurrency}
        removeCurrency={removeCurrency}
        />} 
        />
        <Route path="/dnd-app/Character/:id/*" element={<ItemModal />}/>
    </Routes>
    </div>
  );
}

export default App;