import React from 'react';

const CurrencyField = ({currencies, currency, amount, onCurrencyChange, onAmountChange}) => {

    if(amount === null || amount < 0) {
        amount = 0;
    }

    return (
        <div>
            <input type="number" value={amount} onChange={onAmountChange} style={{borderRadius: '50px'}}/>
            {currency && <select defaultValue={currency.shortname} onChange={onCurrencyChange} >
                {currencies && currencies.map((currency) => <option key={currency._id} value={currency.shortname}>{currency.shortname}&ensp; -&ensp;{currency.fullname}</option>)}
            </select>}
        </div>
    );
};

export {CurrencyField};
