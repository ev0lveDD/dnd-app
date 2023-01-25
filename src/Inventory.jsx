import React, {useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import './Inventory.css';
import CurrencyForm from "./CurrencyForm";
import items from "./JSON/items.json";
import ItemModal from "./ItemModal";

function Inventory( {currency, addCurrency, removeCurrency} ) {
    
    function deleteItem (givenIndex) {
        let filteredInventoryList = inventoryList.filter((item) => {return item !== givenIndex})
        setInventoryList(filteredInventoryList)
        console.log(inventoryList)
    }

    const [isInventoryItemOpen, setInventoryItemOpen] = useState(false);
    const [inventoryList, setInventoryList] = useState([items.item[30], items.item[31]]);
    const [itemIndex, setItemIndex] = useState(0);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const {id} = useParams();
    return(
        <div className="Inventory-Body">
            <p>TOTAL CURRENCY:</p>
            <div className="Currency-Row" onClick={()=>{setIsCurrencyOpen(true)}}>
                <button className="Currency-Button Copper"><h3>{currency.copperAmmount}</h3><h5>COPPER</h5></button>
                <button className="Currency-Button Silver"><h3>{currency.silverAmmount}</h3><h5>SILVER</h5></button>
                <button className="Currency-Button Gold"><h3>{currency.goldAmmount}</h3><h5>GOLD</h5></button>
                <button className="Currency-Button Platinum"><h3>{currency.platinumAmmount}</h3><h5>PLATINUM</h5></button>
            </div>
            <CurrencyForm currency={currency} addCurrency={addCurrency} removeCurrency={removeCurrency} setIsCurrencyOpen={setIsCurrencyOpen} isCurrencyOpen={isCurrencyOpen}/>
            <p>EQUIPMENT:</p>
            <table>
                <thead>
                    <tr>
                        <th className="Table-Header"></th>
                        <th>WEIGHT</th>
                        <th>QTY</th>
                        <th>VALUE</th>
                        <th>USED</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList.map((item, index) => {
                        return(
                            <tr className="Item-Row" key={index} name="row" onClick={() => {setInventoryItemOpen(true)}}>
                                <td><h3 className="Stat-Name">{item.name}</h3></td>
                                <td><h3 className="Stat-Name">{item.weight}</h3></td>
                                <td><h3 className="Stat-Name">1</h3></td>
                                <td><h3 className="Stat-Name">{item.value}</h3></td>
                                <td><button className="Currency-Button" 
                                onClick={() => console.log(inventoryList.filter((inventoryList) => inventoryList.findIndex !== index))}
                                >X</button></td>
                            </tr>);
                    })}
                </tbody>
            </table>
            <div className="Item-Selector">
            <select name="itemSelect" id="itemSelect" onChange={event => setItemIndex(event.target.value)}>
            {items.item.map((entry, index) => {
                return(<option value={index} key={index}>{entry.name}</option>)
            })}
            </select>
            </div>
            <button className="Currency-Button" onClick={() => {setInventoryList(prevValue => [...prevValue, items.item[itemIndex]])}}>Add to array</button>
            <button className="Currency-Button" onClick={() => console.log(inventoryList)}>show</button>
        </div>
    )
}

export default Inventory;