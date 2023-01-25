import React, {useState} from "react";

function SavingThrow(props) {

    const [statCheck, setStatCheck] = useState(props.checked);
    function isChecked(){
      const data = document.getElementById(props.skillName);
      if(data.checked===true){
          return(
              setStatCheck(true)
          )
      }
      else if(data.checked===false){
          return(
              setStatCheck(false)
          )
      }
    }

    return(
            <div className="Saving-Throw">
                <input defaultChecked={props.checked} disabled={props.edit? false : true} className="Round-Checkbox" type="checkbox" id={props.skillName} onChange={isChecked}/>
                <h3 className="Stat-Name">{props.name}</h3>
                <h2 className="Stat-Border">{statCheck ? (props.statBonus+props.proficiency) : props.statBonus}</h2>
            </div>
    );
}

export default SavingThrow;