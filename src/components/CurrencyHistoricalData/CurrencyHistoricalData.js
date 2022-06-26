import React, {useRef, useState} from 'react';
import './CurrencyHistoricalData.css';
import {useSelector} from "react-redux";
import {TimeseriesChart} from "../TimeseriesChart/TimeseriesChart";

const CurrencyHistoricalData = () => {

    const {currency1, currency2} = useSelector(state => state.currencies);
    const startDate = useRef(), endDate = useRef();
    const [timeseriesData, setTimeseriesData] = useState(null)

     function submit(e) {
        e.preventDefault();
         return setTimeseriesData({
                startDate: {
                    day: Number(startDate.current.value.split('-')[2]),
                    month: Number(startDate.current.value.split('-')[1]),
                    year: Number(startDate.current.value.split('-')[0]),
                },
                endDate: {
                    day: Number(endDate.current.value.split('-')[2]),
                    month: Number(endDate.current.value.split('-')[1]),
                    year: Number(endDate.current.value.split('-')[0]),
                },
                currencySymbol: currency2.shortname,
                baseCurrency: currency1.shortname
            });
    }


    return (
        <React.Fragment>
            <form onSubmit={submit}>
                <div className={'CurrencyHistoricalDetails'}>
                    <h2>Currency details</h2>
                    <h3>*note that our service provide currency historical data within 1 year maximum</h3>
                    <div>
                        <label className={'CurrencyLabelsText'}>
                            Start date: <input type="date" min='2000-01-01' max='2022-06-21' ref={startDate}/>
                        </label>
                        <label className={'CurrencyLabelsText'}>
                            End Date: <input type="date" min={'2001-01-01'} max='2022-06-22' ref={endDate}/>
                        </label>
                    </div>
                    <button className={'submitBtn'} type='submit'>Submit</button>
                </div>
            </form>
            {timeseriesData && <TimeseriesChart timeseriesData={timeseriesData}/>}
        </React.Fragment>
    );
};

export {CurrencyHistoricalData};
