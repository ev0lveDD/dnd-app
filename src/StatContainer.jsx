import React, {useState} from "react";

function StatContainer(props){

    return(
        <div className="stat-container">
            <p>{props.name}</p>
            <h2>{props.checkBonusSign(props.bonus) + props.bonus}</h2>
            <div className="Stat-Oval">
                <h3>{props.value}</h3>
            </div>
            {props.edit && <div className="stat-button-container">
                <button className="stat-button" name={props.nameValue} onClick={props.statUp}>+</button>
                <button className="stat-button" name={props.nameValue} onClick={props.statDown}>-</button>
            </div>}
        </div>
    );
}

export default StatContainer;