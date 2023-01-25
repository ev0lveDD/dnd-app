import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import './Components/Login.css';
import './CharacterSelect.css';
import NewCharacterForm from "./NewCharacterForm";
import { db, auth } from "./firebase-config";
import { collection, getDocs, updateDoc, doc, CollectionReference, addDoc, setDoc, deleteDoc, getDoc, firestore } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { storage } from "./firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
import defaultAvatar from "./Images/cleric.jpg";
import Modal from "./Modal";

function CharacterSelect({characters, getCharacter, user, auth, fetchPost}) {

    const [newCharOpen, setNewCharOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function showNewCharacterForm(){
      if(newCharOpen===true){
        setNewCharOpen(false);
      } else if(newCharOpen===false){
        setNewCharOpen(true);
      }
    }

    const logout = async () => {
      await signOut(auth);
    }

    const createCharacter = async () => {
        if(newImageName==null){
          return( alert("Please upload avatar image"));
        } else {
        const collectionRef = collection(db, "characters");
        const newFields = {
            userID: user.uid,
            name: document.getElementById("nameForm").value,
            race: document.getElementById("raceForm").value,
            class: document.getElementById("classForm").value,
            strengthValue: Number(document.getElementById("strengthValueForm").value),
            dexterityValue: Number(document.getElementById("dexterityValueForm").value),
            constitutionValue: Number(document.getElementById("constitutionValueForm").value),
            intelligenceValue: Number(document.getElementById("intelligenceValueForm").value),
            wisdomValue: Number(document.getElementById("wisdomValueForm").value),
            charismaValue: Number(document.getElementById("charismaValueForm").value),
            darkvision: Number(document.getElementById("darkvisionForm").value),
            armorClass: Number(document.getElementById("armorClassForm").value),
            level: Number(document.getElementById("levelForm").value),
            currentHP: Number(document.getElementById("healthPointsForm").value),
            maxHP: Number(document.getElementById("healthPointsForm").value),
            walkingSpeed: Number(document.getElementById("walkingSpeedForm").value),
            Acrobatics: false,
            AnimalHandling: false,
            Arcana: false,
            Athletics: false,
            Deception: false,
            History: false,
            Insight: false,
            Intimidation: false,
            Investigation: false,
            Medicine: false,
            Nature: false,
            Perception: false,
            Performance: false,
            Persuasion: false,
            Religion: false,
            SleightOfHand: false,
            Stealth: false,
            Survival: false,
            charismaSave: false,
            constitutionSave: false,
            dexteritySave: false,
            intelligenceSave: false,
            strengthSave: false,
            wisdomSave: false
        }
        const docRef = await addDoc(collectionRef, newFields);
        setDoc(doc(db, "characters", docRef.id), {id: docRef.id, imageURL: newImageName}, { merge: true})
        fetchPost();
        showNewCharacterForm();}
    }

    const deleteCharacter = async (id) => {
        const userDoc = doc(db, "characters", id);
        await deleteDoc(userDoc);
        fetchPost();
    }

    const [delCharID, setDelCharID] = useState("");

    const [imageUpload, setImageUpload] = useState(null);
    const [newImageName, setNewImageName] = useState();
    const uploadImage = () => {
        if(imageUpload==null){
            return( alert("Please upload avatar image"));
        } else{
            const imageName = imageUpload.name + v4();
            setNewImageName(imageName);
            const imageRef = ref(storage, `images/${imageName}`)
            console.log(imageRef);
            console.log(imageName);
            uploadBytes(imageRef, imageUpload).then(() => {
                alert("Avatar uploaded!")
            })
        }
    };

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
        <div className="Login-Body">
            {user ?
            <div className="Character-Select">
                <h4>User Logged In: {user?.email}  ID: {user?.uid}</h4>
                <Link className="text-link" to={'/dnd-app'}><button className="Login-Button" onClick={logout}>SIGN OUT</button></Link>
                {characters.map((character, index)=> {
                if(((character.userID).valueOf()) === ((user.uid).valueOf())){
                    return(
                <div className="Character-Row" key={index} onClick={() => {getCharacter(character.id)}}>
                <Link className="Character-Row" to={`/dnd-app/Character/${character.id}`}>
                {imageList.map((url, index) => {
                if(url.includes(character.imageURL)){
                    return <img key={index} src={url}/>
                } else {
                }
                    })}
                {character.imageURL==null && <img src={defaultAvatar}/>}
                    <div className="Character-Row-Description">
                        <h5>{character.name}</h5>
                        <p>Level: {character.level}</p>
                        <p>{character.race} · {character.class}</p>
                    </div>
                    </Link>
                    <button className="Delete-Char-Button" onClick={() => {setDelCharID(character.id);setIsModalOpen(true)}}><h3>X</h3></button>
                </div>
            );
                } else{return(null
                )}
        })}
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} deleteCharacter={deleteCharacter} delCharID={delCharID}/>}
            <NewCharacterForm newCharOpen={newCharOpen} showNewCharacterForm={showNewCharacterForm} createCharacter={createCharacter} uploadImage={uploadImage} setImageUpload={setImageUpload}/>
            <button className="New-Char-Button" onClick={showNewCharacterForm}><h3>+</h3></button>
            </div> : <div>loading...</div>}
            {user ? null : <Navigate to="/dnd-app"></Navigate>}
        </div>
    )
}

export default CharacterSelect;
