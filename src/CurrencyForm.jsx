import React from "react";

function CurrencyForm( {currency, addCurrency, removeCurrency, setIsCurrencyOpen, isCurrencyOpen} ) {
    return(
        <div className="Currency-Form" style={{display: isCurrencyOpen ? 'flex' : 'none'}}>
        <div className="Currency-Form-Top-Bar">
            <button className="Back-Arrow" onClick={()=>{setIsCurrencyOpen(false)}}><i className='fas fa-angle-left'></i></button>
            <p>Currency Management</p>
        </div>
        <div className="Currency-Form-Column">
            <div className="Currency-Form-Row">
                <div>
                    <p>Platinum</p>
                    <p>= 10 GP</p>
                </div>
                <p>{currency.platinumAmmount}</p>
            </div>
            <hr></hr>
            <div className="Currency-Form-Row">
                <div>
                    <p>Gold</p>
                    <p>= 10 SP</p>
                </div>
                <p>{currency.goldAmmount}</p>
            </div>
            <hr></hr>
            <div className="Currency-Form-Row">
                <div>
                    <p>Silver</p>
                    <p>= 10 CP</p>
                </div>
                <p>{currency.silverAmmount}</p>
            </div>
            <hr></hr>
            <div className="Currency-Form-Row">
                <p>Copper</p>
                <p>{currency.copperAmmount}</p>
            </div>
            <hr></hr>
        </div>
        <div className="Currency-Form-Input-Row">
            <div className="Currency-Form-Input">
                <p>PLATINUM</p>
                <input type="number" name="platinum-ammount" id="platinum-ammount" min="0"></input>
            </div>
            <div className="Currency-Form-Input">
                <p>GOLD</p>
                <input type="number" name="gold-ammount" id="gold-ammount" min="0"></input>
            </div>
            <div className="Currency-Form-Input">
                <p>SILVER</p>
                <input type="number" name="silver-ammount" id="silver-ammount" min="0"></input>
            </div>
            <div className="Currency-Form-Input">
                <p>COPPER</p>
                <input type="number" name="copper-ammount" id="copper-ammount" min="0"></input>
            </div>
        </div>
        <div className="Currency-Form-Buttons">
            <button onClick={addCurrency}>ADD</button>
            <button onClick={removeCurrency} className="Damage-Button">REMOVE</button>
        </div>
    </div>
    );
}

export default CurrencyForm;