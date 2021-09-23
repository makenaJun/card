import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react"
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText"
import SuperButton from "../../main/ui/common/SuperButton/SuperButton"
import s from "./Registration.module.css"
import {RegisterParamsType} from "../../api/Api"
import {useDispatch, useSelector} from "react-redux"
import {registration} from "../../main/bll/registerReducer"
import {AppStateType} from "../../main/bll/store"
import {Redirect} from "react-router-dom"

export const Registration = () => {

    const [values, setValues] = useState<RegisterParamsType>({
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [type, setType] = useState<"password" | "text">("password")
    const [disabled, setDisabled] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    })
    const dispatch = useDispatch()
    let error = useSelector<AppStateType, string>(state => state.registration.error)
    const isLogin = useSelector<AppStateType, boolean>(state => state.registration.isLogin)


/*    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, name: "email" | "password" | "repeatPassword") => {
        const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        setValues({...values, [name]: e.currentTarget.value})
        if (e.target.name === "email"){
            if (re.test(e.currentTarget.value)) {
                setErrorMessage({...errorMessage, [name]: "valid"})
            } else {
                setErrorMessage({...errorMessage, [name]: "noValid"})
            }
        }
        if (values.password.length < 7) {
            setErrorMessage({...errorMessage, [name]: "short password"})
        } else {
            setErrorMessage({...errorMessage, [name]: ""})
        }
    }*/

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (re.test(e.currentTarget.value)) {
            setErrorMessage({...errorMessage, email: "valid"})
        } else {
            setErrorMessage({...errorMessage, email: "noValid"})
        }
        setValues({...values, email: e.currentTarget.value})
    }

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (values.password.length < 7) {
            setErrorMessage({...errorMessage, password: "short password"})
        } else {
            setErrorMessage({...errorMessage, password: ""})
        }
        setValues({...values, password: e.currentTarget.value})
    }

    const repeatPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, repeatPassword: e.currentTarget.value})
    }

    useEffect(()=>{
        if (values.password !== values.repeatPassword) {
            setErrorMessage({...errorMessage, repeatPassword: "pass is bad"})
            setDisabled(true)
        }
        if (values.password === values.repeatPassword){
            setErrorMessage({...errorMessage, repeatPassword: ""})
            setDisabled(false)
        }
    },[values.repeatPassword])

    const registrationSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(registration(values))
        e.preventDefault()
        setValues({email: "", password: "", repeatPassword: ""})
        setErrorMessage({email: "", password: "", repeatPassword: ""})
    }

    const changePasswordTypeHandler = () => {
        setType(type === "text" ? "password" : 'text')
    }

    if (isLogin) {
        return <Redirect to={"/login"}/>
    }

    return (
        <form className={s.formContainer} onSubmit={registrationSubmit}>
            <div className={s.container}>
                <h1 className={s.header}>Registration</h1>
                <SuperInputText
                    value={values.email}
                    className={s.emailField}
                    name={"email"}
                    placeholder={"email"}
                    type={"text"}
                    onChange={emailChangeHandler}
                    error={errorMessage.email}
                />
                <SuperInputText
                    value={values.password}
                    className={s.passwordField}
                    name={"password"}
                    placeholder={"password"}
                    specialType={type}
                    type={type}
                    error={errorMessage.password}
                    onChange={passwordChangeHandler}
                    onClick={() => changePasswordTypeHandler()}
                />
                <SuperInputText
                    value={values.repeatPassword}
                    className={s.passwordField}
                    name={"repeatPassword"}
                    placeholder={"repeatPassword"}
                    specialType={type}
                    type={type}
                    error={errorMessage.repeatPassword}
                    onChange={repeatPasswordChangeHandler}
                    onClick={() => changePasswordTypeHandler()}
                />

                <div className={s.error}>{error && error}</div>
                <SuperButton
                    className={s.button}
                    disabled={disabled}
                >
                    Create account
                </SuperButton>
            </div>
        </form>
    )
}