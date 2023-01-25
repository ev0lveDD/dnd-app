import React from "react";
import "./ItemModal.css";

function ItemModal( {setInventoryItemOpen, name, description} ) {
    return(
        <div className="Modal-Background">
            <div className="Modal-Container">
                <button className="Modal-Title-Close-Btn" onClick={() => {setInventoryItemOpen(false)}}> X </button>
                <div className="Modal-Title">
                    <h1>{name}</h1>
                </div>
                <div className="Modal-Body"></div>
                    <p className="P-Hint">{description}</p>
                <div className="Modal-Footer">
                </div>
            </div>
        </div>
    );
}

export default ItemModal;