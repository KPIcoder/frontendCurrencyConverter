import React from 'react';
import {LoginForm} from "../../components";

const LoginPage = () => {
    return (
        <div style={{display: "flex", minHeight:"50vh", justifyContent: "center", alignItems: "center"}}>
            <LoginForm/>
        </div>
    );
};

export {LoginPage};
