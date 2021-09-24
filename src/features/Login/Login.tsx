import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import style from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../main/bll/store';
import {Link, Redirect} from 'react-router-dom';
import {PATH} from '../../main/ui/routes/Routes';
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText';
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../main/ui/common/SuperButton/SuperButton';
import {login} from '../../main/bll/login-reducer';
import commonStyles from '../../main/ui/styles/commonStyles.module.css';
import Loader from '../../main/ui/common/Loader/Loader';
import {ResponseStatusType, setAppError} from '../../main/bll/app-reducer';
import {cleanup} from '../../main/helpers/clean';
import noView from '../../main/ui/images/icon/no-view.svg';
import view from '../../main/ui/images/icon/view.svg';

export const Login = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.isAuth);
    const status = useSelector<AppStateType, ResponseStatusType>(state => state.app.status);
    const error = useSelector<AppStateType, string | null>(state => state.app.error);

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [rememberMe, setRememberMe] = useState<boolean>(false);
    let [visibleInput, setVisibleInput] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => cleanup(dispatch);
    }, []);

    useEffect(() => {
        error && dispatch(setAppError(null));
    }, [email, password, rememberMe]);


    const changeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }, [setEmail])

    const changeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }, [setPassword]);

    const changeHandlerRememberMe = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }, [setRememberMe]);


    const handlerSubmit = () => {
        const values = {
            email,
            password,
            rememberMe,
        }
        dispatch(login(values))
    }

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
                        <div className={style.input}>
                            <SuperInputText
                                className={commonStyles.bigInput}
                                placeholder={'Email'}
                                onChange={changeHandlerEmail}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={commonStyles.inputWrapper}>
                            <SuperInputText
                                type={visibleInput ? 'text' : 'password'}
                                name={'password'}
                                placeholder={'Password'}
                                className={commonStyles.bigInput}
                                onChange={changeHandlerPassword}
                            />
                            <img className={commonStyles.bigViewImg}
                                 onClick={() => setVisibleInput(!visibleInput)}
                                 src={visibleInput ? noView : view}
                                 alt={'view'}/>
                        </div>
                    </div>
                    <div className={style.rememberMe}>
                        <SuperCheckbox
                            type="checkbox"
                            id={'rememberMe'}
                            onChange={changeHandlerRememberMe}
                        /><label htmlFor={'rememberMe'}>Remember me</label>
                    </div>
                </div>
                <div className={style.footerBlock}>
                    <div className={commonStyles.errorWrapper}>
                        {error && <span className={commonStyles.error}>{error}</span>}
                    </div>
                    <div className={style.buttonWrapper}>
                        {status === 'loading' ? <Loader/> :
                            <SuperButton
                                onClick={handlerSubmit}
                                disabled={!!error}
                                className={commonStyles.bigButton}
                            >
                                Login
                            </SuperButton>
                        }
                    </div>
                    <div><Link to={PATH.REMINDER}>forgot password?</Link></div>
                    <div><Link to={PATH.REGISTRATION}>don't have an account?</Link></div>
                </div>
            </div>
        </div>
    );
}