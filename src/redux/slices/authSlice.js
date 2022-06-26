import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminService} from "../../services";

const initialState = {
    isAuth: null,
    loginError: null,
    currency: null,

};

const login = createAsyncThunk(
    'login',
    async ({password}) => {
        const {data} = await adminService.login(password);
        return data;
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth:state => {
            state.isAuth = true
        },
        setError:state => {
            state.loginError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.loginError = false;
                localStorage.setItem("token", action.payload.token);
        })
            .addCase(login.rejected, state => {
                state.loginError = true;
            })
    }
});

const {reducer: authReducer, actions:{setAuth, setError}} = authSlice;
const authActions = {
    login,
    setAuth,
    setError,
}

export {authReducer, authActions}
