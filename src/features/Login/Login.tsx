import React, {ChangeEvent, useCallback, useState} from 'react';
import style from './Login.module.css'
import {herokuAPI} from "../../api/Api";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../main/bll/login-reducer";
import {AppStateType} from "../../main/bll/store";
import {Redirect} from "react-router-dom";


herokuAPI.getPing()
    .then(res => {
        console.log("ping:" + ' ' + res.data.ping + 'ms')
    })

export const Login = React.memo(() => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.isAuth)

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)


    const changeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [setEmail])

    const changeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])

    const changeHandlerRememberMe = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked)
    }, [setRememberMe])

    const values = {
        email: email,
        password: password,
        rememberMe: rememberMe
    }

    const handlerSubmit = () => {
        dispatch(loginTC(values))
    }


    console.log(email)
    console.log(password)
    console.log(rememberMe)

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div className={style.login}>
            <div className={style.loginContainer}>
                <div className={style.descriptionBlock}>
                    <h1>Friday Project</h1>
                    <br/>
                    <h2>Sign in</h2>
                </div>
                <div className={style.inputBlock}>
                    <div>
                        <span>Email</span>
                        <div className={style.input}>
                            <input
                                type={'email'}
                                placeholder={'example@gmail.com'}
                                onInput={changeHandlerEmail}
                            />
                        </div>
                    </div>
                    <div>
                        <span>Password</span>
                        <div className={style.input}>
                            <input
                                type={'password'}
                                placeholder={'enter password'}
                                onInput={changeHandlerPassword}
                            />
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                onChange={changeHandlerRememberMe}
                            /> rememberMe?
                        </div>
                    </div>
                </div>
                <div className={style.forgotPassword}>
                    <div><a href="/forgot">forgot password</a></div>
                </div>
                <div className={style.footerBlock}>
                    <button
                        onClick={handlerSubmit}
                        type={'submit'}
                        className={style.button}>Login
                    </button>
                    <div><a href="/register">don't have an account?</a></div>
                    <div><a href="/register">Sign up</a></div>
                </div>
            </div>
        </div>
    );
});
