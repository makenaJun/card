import React, {ChangeEvent, FormEvent, useState} from "react"
import {herokuAPI, LoginParamsType} from "../../api/Api"
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText"
import SuperButton from "../../main/ui/common/SuperButton/SuperButton"
import SuperCheckbox from "../../main/ui/common/SuperCheckbox/SuperCheckbox"
import s from "./Login.module.css"
import {login, setError} from "../../main/bll/login-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../../main/bll/store"
import {Redirect} from "react-router-dom"

export const Login: React.FC = () => {
    /*    let ping = herokuAPI.getPing()
        console.log(ping)
*/
    const email = useSelector<AppStateType, string>(state => state.login.email)
    const error = useSelector<AppStateType, string>(state => state.login.error ? state.login.error : "")
    const [values, setValues] = useState<LoginParamsType>({email, rememberMe: false, password: ""})
    const dispatch = useDispatch()

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            dispatch(setError(""))
        }
        setValues({...values, email: e.currentTarget.value})
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, password: e.currentTarget.value})
    }
    const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, rememberMe: e.currentTarget.checked})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(login(values))
        e.preventDefault()
        setValues({email: "", password: "", rememberMe: false})
    }

    if (email) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            <div className={s.formContainer} style={{border: "2px solid", width: "300px"}}>
                <h1 className={s.header}>Login</h1>
                <SuperInputText
                    className={s.emailInput}
                    placeholder={"email"}
                    type={"text"}
                    value={values.email}
                    onChange={emailChangeHandler}
                />
                <SuperInputText
                    className={s.passwordInput}
                    placeholder={"password"}
                    type={"password"}
                    value={values.password}
                    onChange={passwordChangeHandler}
                />
                <SuperCheckbox
                    className={s.checkbox}
                    checked={values.rememberMe}
                    onChange={checkboxChangeHandler}
                >
                    remember me
                </SuperCheckbox>
                <div className={s.error}
                     style={{color: "red"}}
                >
                    {error && error}
                </div>
                <SuperButton
                    className={s.loginButton}
                >
                    login
                </SuperButton>
            </div>
        </form>
    )
}