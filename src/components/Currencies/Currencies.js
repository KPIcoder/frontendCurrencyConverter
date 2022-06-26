import React, {useEffect} from 'react';
import {Currency} from "../Currency/Currency";
import {useDispatch, useSelector} from "react-redux";
import {currencyActions} from "../../redux";

const Currencies = () => {

    const {currencies} = useSelector(state => state.currencies)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currencyActions.getAll())
    }, [dispatch])

    console.log(currencies);

    return (
        <div>
            {currencies && currencies.map((currency) => <Currency key={currency?._id} currency={currency}/>)}
        </div>
    );
};

export {Currencies};
