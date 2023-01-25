import React from "react";
import "./Modal.css";

function Modal( {setIsModalOpen, deleteCharacter, character, delCharID} ) {
    return(
        <div className="Modal-Background">
            <div className="Modal-Container">
                <button className="Modal-Title-Close-Btn" onClick={() => {setIsModalOpen(false)}}> X </button>
                <div className="Modal-Title">
                    <h1>Are you sure you want to delete this character ?</h1>
                </div>
                <div className="Modal-Body"></div>
                    <p className="P-Hint">This change will not be reversible!</p>
                <div className="Modal-Footer">
                    <button onClick={() => {setIsModalOpen(false)}}>CANCEL</button>
                    <button className="Delete-Button" onClick={() => {deleteCharacter(delCharID);setIsModalOpen(false)}}>DELETE</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;