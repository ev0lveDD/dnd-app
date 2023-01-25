import React from "react";

function Sense(props) {

    return(
            <div className="Sense">
                <h2 className="Stat-Border">{(10+props.statBonus+props.proficiency)}</h2>
                <h3 className="Stat-Name">{props.skillName}</h3>
            </div>
    );
}

export default Sense;