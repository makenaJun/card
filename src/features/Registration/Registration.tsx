import React, {ChangeEvent, FormEvent, useState} from "react"
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText"
import SuperButton from "../../main/ui/common/SuperButton/SuperButton"
import s from "./Registration.module.css"
import {RegisterParamsType} from "../../api/Api"
import {useDispatch, useSelector} from "react-redux"
import {registration} from "../../main/bll/registerReducer"
import {AppStateType} from "../../main/bll/store"
import {Redirect} from "react-router-dom"

export const Registration = () => {


    const [values, setValues] = useState<RegisterParamsType>({email: "", password: ""})
    const [type, setType] = useState<"password" | "text">("password")
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    let error = useSelector<AppStateType, string>(state => state.registration.error)
    const isLogin = useSelector<AppStateType, boolean>(state => state.registration.isLogin)


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
        if (values.password.length <= 5) {
            setErrorMessage({...errorMessage, password: "short password"})
        } else {
            setErrorMessage({...errorMessage, password: ""})
        }
        setValues({...values, password: e.currentTarget.value})
    }
    const registrationSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(registration(values))
        e.preventDefault()
        setValues({email: "", password: ""})
        setErrorMessage({email: "", password: ""})
    }
    const changeTypeHandler = () => {
        if (type === "password")
            setType("text")
        if (type === "text")
            setType("password")
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
                    placeholder={"email"}
                    type={"text"}
                    onChange={emailChangeHandler}
                    error={errorMessage.email}
                />
                <SuperInputText
                    value={values.password}
                    className={s.passwordField}
                    placeholder={"password"}
                    specialType={type}
                    type={type}
                    error={errorMessage.password}
                    onChange={passwordChangeHandler}
                    onChangeType={() => changeTypeHandler()}
                />

                <div className={s.error}>{error && error}</div>
                <SuperButton
                    className={s.button}
                >
                    Create account
                </SuperButton>
            </div>
        </form>
    )
}