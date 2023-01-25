import React, {useState} from "react";
import ReactDOM from "react-dom/client";

function SkillsTableRow(props) {

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
            <tr>
                <td><input defaultChecked={props.checked} disabled={props.edit? false : true} className="Round-Checkbox" type="checkbox" id={props.skillName} onChange={isChecked}/></td>
                <td><h3 className="Stat-Name">{props.stat}</h3></td>
                <td><h3 className="Stat-Name">{props.skillName}</h3></td>
                <td><h2 className="Stat-Border">{statCheck ? (props.statBonus+props.proficiency) : props.statBonus}</h2></td>
            </tr>
    );
}

export default SkillsTableRow;