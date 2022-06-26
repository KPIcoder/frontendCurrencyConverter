import React from 'react';
import {useDispatch} from "react-redux";

import {currencyActions} from "../../redux";
import './Currency.css'


const Currency = ({currency}) => {

    const dispatch = useDispatch();
    const {_id: id, fullname, shortname, rateByUSD} = currency;

    async function deleteById() {
        await dispatch(currencyActions.deleteById({id}))
    }

    function updateById() {
        dispatch(currencyActions.setCurrencyForUpdate({currency}));
    }

    return (
        <div className={'mb30'}>
            {shortname}-{fullname}-{rateByUSD}
            <button className={'CurrencyBtn'} onClick={deleteById}>Delete</button>
            <button className={'CurrencyBtn'} onClick={updateById}>Update</button>
        </div>
    );
};

export {Currency};
