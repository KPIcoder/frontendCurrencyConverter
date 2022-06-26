import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useLocation, useNavigate} from "react-router-dom";
import './LoginForm.css'
const LoginForm = () => {

    const {register, handleSubmit} = useForm()
    const {loginError} = useSelector(state => state.auth);
    const [errors, setErrors] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {state} = useLocation();


    async function submit(password) {
        try {
            password = JSON.stringify(password);
            await dispatch(authActions.login({password}))
            navigate(state?.pathname || '/', {replace: true})
        } catch (e) {
            setErrors(e.response.data);
        }
    }

    return (
        <form style={{display:"flex", flexDirection:"column", rowGap: "20px", alignItems: "center", fontSize: "20px"}} onSubmit={handleSubmit(submit)}>
            <input type="password" {...register('password')}/>
            {errors && <span>{errors.password[0]}</span>}
            <button className={'btn'}>Login</button>
            {loginError && <span style={{color: "rgb(204,0,0)"}}>Wrong data</span>}
        </form>
    );
};

export {LoginForm};
