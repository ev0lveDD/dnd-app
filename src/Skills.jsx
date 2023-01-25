import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import SkillsTableRow from "./SkillsTableRow";

function Skills( {statBonus, proficiencyBonus, newCharacter, edit} ) {
   
    return(
         <div className="skills-container">
            <table>
                <thead>
                    <tr>
                        <th className="Table-Header">PROF</th>
                        <th>MOD</th>
                        <th>SKILL</th>
                        <th>BONUS</th>
                    </tr>
                </thead>
                <tbody>
                    <SkillsTableRow skillName="Acrobatics" stat="DEX" statBonus={statBonus.dexterityBonus} proficiency={proficiencyBonus} checked={newCharacter.Acrobatics} edit={edit}/>
                    <SkillsTableRow skillName="Animal Handling" stat="WIS" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.AnimalHandling} edit={edit}/>
                    <SkillsTableRow skillName="Arcana" stat="INT" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.Arcana} edit={edit}/>
                    <SkillsTableRow skillName="Athletics" stat="STR" statBonus={statBonus.strengthBonus} proficiency={proficiencyBonus} checked={newCharacter.Athletics} edit={edit}/>
                    <SkillsTableRow skillName="Deception" stat="CHA" statBonus={statBonus.charismaBonus} proficiency={proficiencyBonus} checked={newCharacter.Deception} edit={edit}/>
                    <SkillsTableRow skillName="History" stat="INT" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.History} edit={edit}/>
                    <SkillsTableRow skillName="Insight" stat="WIS" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.Insight} edit={edit}/>
                    <SkillsTableRow skillName="Intimidation" stat="CHA" statBonus={statBonus.charismaBonus} proficiency={proficiencyBonus} checked={newCharacter.Intimidation} edit={edit}/>
                    <SkillsTableRow skillName="Investigation" stat="INT" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.Investigation} edit={edit}/>
                    <SkillsTableRow skillName="Medicine" stat="WIS" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.Medicine} edit={edit}/>
                    <SkillsTableRow skillName="Nature" stat="INT" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.Nature} edit={edit}/>
                    <SkillsTableRow skillName="Perception" stat="WIS" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.Perception} edit={edit}/>
                    <SkillsTableRow skillName="Performance" stat="CHA" statBonus={statBonus.charismaBonus} proficiency={proficiencyBonus} checked={newCharacter.Performance} edit={edit}/>
                    <SkillsTableRow skillName="Persuasion" stat="CHA" statBonus={statBonus.charismaBonus} proficiency={proficiencyBonus} checked={newCharacter.Persuasion} edit={edit}/>
                    <SkillsTableRow skillName="Religion" stat="INT" statBonus={statBonus.intelligenceBonus} proficiency={proficiencyBonus} checked={newCharacter.Religion} edit={edit}/>
                    <SkillsTableRow skillName="Sleight of hand" stat="DEX" statBonus={statBonus.dexterityBonus} proficiency={proficiencyBonus} checked={newCharacter.SleightOfHand} edit={edit}/>
                    <SkillsTableRow skillName="Stealth" stat="DEX" statBonus={statBonus.dexterityBonus} proficiency={proficiencyBonus} checked={newCharacter.Stealth} edit={edit}/>
                    <SkillsTableRow skillName="Survival" stat="WIS" statBonus={statBonus.wisdomBonus} proficiency={proficiencyBonus} checked={newCharacter.Survival} edit={edit}/>
                </tbody>
            </table>
        </div>
    );
}

export default Skills;