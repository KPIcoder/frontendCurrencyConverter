import React, {useEffect, useState} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts"

import {currencyService} from "../../services";
import {objToArray} from "../CurrencyHistoricalData/functions";

const TimeseriesChart = ({timeseriesData}) => {

    const [timeseriesCurrency, setTimeseriesCurrency] = useState();

    useEffect(()=> {
        currencyService.getTimeseries(timeseriesData).then(({data}) => setTimeseriesCurrency(data));
    }, [timeseriesData])

    const data = objToArray(timeseriesCurrency);
    console.log(data);


    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
            <LineChart width={1200} height={400} data={data} style={{backgroundColor: "snow"}} margin={{ top: 15, right: 40, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="value" stroke="rgb(22,69,122)" dot={false} />
                <CartesianGrid stroke="rgb(205,233,231, 0.7)" />
                <XAxis dataKey="name" strokeDasharray="5 5"/>
                <YAxis/>
                <Tooltip/>
            </LineChart>
        </div>
    );
};

export {TimeseriesChart};
