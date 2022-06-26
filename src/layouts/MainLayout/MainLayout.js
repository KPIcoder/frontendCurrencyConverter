import React from 'react';
import {Outlet} from "react-router-dom";
import './MainLayout.css'

const MainLayout = () => {
    return (
        <div>
            <header className={'header'}>Today`s currency market</header>
            <Outlet/>
        </div>
    );
};

export {MainLayout};
