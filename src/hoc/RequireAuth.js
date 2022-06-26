import React from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RequireAuth = ({children}) => {

    const location = useLocation();
    const {isAuth} = useSelector(state => state.auth);

    if (!isAuth) {
        return <Navigate to={'/login'} state={location}/>
    }

    return children;

};

export {RequireAuth};
