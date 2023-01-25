import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import StatContainer from "./StatContainer";
import SavingThrow from "./SavingThrow";
import Sense from "./Sense";
import Skills from "./Skills";

function Stats( {statValue, statBonus, statUp, statDown, edit, checkBonusSign, proficiencyBonus, newCharacter, checkProficiency} ) {
    return(
        <div>
            <div className="container">
            <div className="row">
                <StatContainer name="STRENGTH" nameValue="strengthValue" value={statValue.strengthValue} bonus={statBonus.strengthBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
                <StatContainer name="DEXTERITY" nameValue="dexterityValue" value={statValue.dexterityValue} bonus={statBonus.dexterityBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
                <StatContainer name="CONSTITUTION" nameValue="constitutionValue" value={statValue.constitutionValue} bonus={statBonus.constitutionBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
            </div>
            <div className="row">
                <StatContainer name="INTELLIGENCE" nameValue="intelligenceValue" value={statValue.intelligenceValue} bonus={statBonus.intelligenceBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
                <StatContainer name="WISDOM" nameValue="wisdomValue" value={statValue.wisdomValue} bonus={statBonus.wisdomBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
                <StatContainer name="CHARISMA" nameValue="charismaValue" value={statValue.charismaValue} bonus={statBonus.charismaBonus} statUp={statUp} statDown={statDown} edit={edit} checkBonusSign={checkBonusSign}/>
            </div>
         </div>
         <hr />
         <div className="Section-Label">
                <h3>Saving Throws</h3>
        </div>
         <div className="Saving-Throws">
            <div className="row">
                <SavingThrow skillName="strengthSave" name="STRENGTH" statBonus={statBonus.strengthBonus} proficiency={proficiencyBonus} checked={newCharacter.strengthSave} edit={edit} checkBonusSign={checkBonusSign}/>
                <SavingThrow skillName="intelligenceSave" name="INTELLIGENCE" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.intelligenceSave} edit={edit} checkBonusSign={checkBonusSign}/>
            </div>
            <div className="row">
                <SavingThrow skillName="dexteritySave" name="DEXTERITY" statBonus={statBonus.dexterityBonus} proficiency={proficiencyBonus} checked={newCharacter.dexteritySave} edit={edit} checkBonusSign={checkBonusSign}/>
                <SavingThrow skillName="wisdomSave" name="WISDOM" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.wisdomSave} edit={edit} checkBonusSign={checkBonusSign}/>
            </div>
            <div className="row">            
                <SavingThrow skillName="constitutionSave" name="CONSTITUTION" statBonus={statBonus.constitutionBonus} proficiency={proficiencyBonus} checked={newCharacter.constitutionSave} edit={edit} checkBonusSign={checkBonusSign}/>
                <SavingThrow skillName="charismaSave" name="CHARISMA" statBonus={statBonus.charismaBonus} proficiency={proficiencyBonus} checked={newCharacter.charismaSave} edit={edit} checkBonusSign={checkBonusSign}/>
            </div>
         </div>
         <hr />
         <div className="Section-Label">
            <h3>Senses</h3>
        </div>
         <div className="Senses">
            <Sense skillName="PASSIVE WIS (PERCEPTION)" statBonus={statBonus.wisdomBonus} proficiency={checkProficiency(newCharacter.Perception)}/>
            <Sense skillName="PASSIVE INT (INVESTIGATION)" statBonus={statBonus.intelligenceBonus} proficiency={checkProficiency(newCharacter.Investigation)}/>
            <Sense skillName="PASSIVE WIS (INSIGHT)" statBonus={statBonus.wisdomBonus} proficiency={checkProficiency(newCharacter.Insight)}/>
	        <p className="Darkvision">Darkvision: {newCharacter.darkvision} FT.</p>
         </div>
         <hr />
         <Skills statBonus={statBonus} proficiencyBonus={proficiencyBonus} newCharacter={newCharacter} edit={edit}/>
        </div>
    );
}

export default Stats;