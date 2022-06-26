import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {currencyValidator} from "../../validators";
import {useDispatch, useSelector} from "react-redux";
import {currencyActions} from "../../redux";
import './CurrencyForm.css'

const CurrencyForm = () => {

    const {currencyForUpdate} = useSelector(state => state.currencies);

    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm({
        resolver: joiResolver(currencyValidator),
        mode: "onTouched"
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (currencyForUpdate) {
            const {fullname, shortname, rateByUSD} = currencyForUpdate
            setValue("currencyFullName", fullname);
            setValue("currencyShortName", shortname);
            setValue("currencyRateByUSD", rateByUSD);
        }
    }, [currencyForUpdate, setValue])

    async function submit(newCurrency) {
        if (currencyForUpdate) {
            await dispatch(currencyActions.updateById({id: currencyForUpdate._id, currency: newCurrency}));
        } else {
            await dispatch(currencyActions.create({currency: newCurrency}));
        }
        await dispatch(currencyActions.getAll());
        reset();
    }

    return (
        <form className={'formInside'} onSubmit={handleSubmit(submit)}>
            <div><label>Fullname: <input style={{position: "relative", left: "15px"}}
                                         type="text" {...register('currencyFullName')}/></label></div>
            {errors.currencyFullName && <span>{errors.currencyFullName.message}</span>}
            <div><label>Shortname: <input type="text" {...register('currencyShortName')}/></label></div>
            {errors.currencyShortName && <span>{errors.currencyShortName.message}</span>}
            <div><label>Rate: <input style={{position: "relative", left: "55px"}}
                                     type="number" {...register('currencyRateByUSD')}/></label></div>
            {errors.currencyRateByUSD && <span>{errors.currencyRateByUSD.message}</span>}
            <button className={'btn'} style={{display: "block", margin: "20px auto"}}>Save</button>
        </form>
    );
};

export {CurrencyForm};
