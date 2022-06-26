import React from 'react';
import {Currencies, CurrencyForm} from "../../components";
import './AdminPage.css'

const AdminPage = () => {
    return (
        <div className={'wrap'}>
            <h1>Admin Page </h1>
            <CurrencyForm/>
            <div className={'block'}><Currencies/></div>
        </div>
    );
};

export {AdminPage};
