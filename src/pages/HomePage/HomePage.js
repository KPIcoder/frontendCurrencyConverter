import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currencyActions} from "../../redux";
import {CurrencyField, CurrencyHistoricalData} from "../../components";
import './HomePage.css'

const HomePage = () => {

    const {currencies, currency1, currency2, currency1Amount, currency2Amount} = useSelector(state => state.currencies);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(currencyActions.getAll())
    }, [dispatch])

    useEffect(() => {
        if (currency1 && currency2) {
            dispatch(currencyActions.setExchangeRate(currency2.rateByUSD / currency1.rateByUSD))
            dispatch(currencyActions.convert())
        }
    }, [currency1, currency2, dispatch])


    function handleCurrency1AmountChange(e) {
        dispatch(currencyActions.handleCurrency1Amount(e.target.value));
        dispatch(currencyActions.setAmountFromCurrency1(true));
        dispatch(currencyActions.convert());
    }

    function handleCurrency2AmountChange(e) {
        dispatch(currencyActions.handleCurrency2Amount(e.target.value));
        dispatch(currencyActions.setAmountFromCurrency1(false));
        dispatch(currencyActions.convert());
    }

    return (
        <div>
            <div className={'homePageExchangeWrapper'}>
                <h1>Currencies converter</h1>
                {currencies && <CurrencyField currencies={currencies} currency={currency1} amount={currency1Amount}
                                              onCurrencyChange={e => dispatch(currencyActions.handleCurrency1(e.target.value))}
                                              onAmountChange={handleCurrency1AmountChange}/>}
                {currencies && <CurrencyField currencies={currencies} currency={currency2} amount={currency2Amount}
                                              onCurrencyChange={e => dispatch(currencyActions.handleCurrency2(e.target.value))}
                                              onAmountChange={handleCurrency2AmountChange}/>}
            </div>
            <CurrencyHistoricalData/>
        </div>
    );
};

export {HomePage};
