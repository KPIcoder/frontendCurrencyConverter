import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer, currencyReducer} from "./slices";

const rootReducer = combineReducers({
    currencies: currencyReducer,
    auth: authReducer
});

const store = configureStore({
    reducer: rootReducer
});

export {store};

