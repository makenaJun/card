import React, {FormEvent, useEffect, useState} from 'react'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {registration} from '../../main/bll/register-reducer'
import {AppStateType} from '../../main/bll/store'
import {Redirect} from 'react-router-dom'
import {ResponseStatusType, setAppError} from '../../main/bll/app-reducer';
import Loader from '../../main/ui/common/Loader/Loader';
import noView from '../../main/ui/images/icon/no-view.svg';
import view from '../../main/ui/images/icon/view.svg';
import regIcon from '../../main/ui/images/icon/registration-form.png';
import {cleanup} from '../../main/helpers/clean';
import commonStyles from '../../main/ui/styles/commonStyles.module.css';

export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [visibleOneInput, setVisibleOneInput] = useState<boolean>(false);
    const [visibleTwoInput, setVisibleTwoInput] = useState<boolean>(false);

    const status = useSelector<AppStateType, ResponseStatusType>(state => state.app.status);
    const error = useSelector<AppStateType, string | null>(state => state.app.error);
    const isRegSuccess = useSelector<AppStateType, boolean>(state => state.registration.isRegSuccess);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => cleanup(dispatch);
    }, []);

    useEffect(() => {
        error && dispatch(setAppError(null));
    }, [email, password, repeatPassword]);

    const registrationSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const identical = password === repeatPassword;
        if (!identical) {
            dispatch(setAppError(`Passwords don't match!`));
        } else {
            const payload = {
                email: email,
                password: password,
                repeatPassword: repeatPassword
            }
            dispatch(registration(payload));
        }
    }

    if (isRegSuccess) {
        return <Redirect to={'/login'}/>
    }

    return (
        <form className={s.formContainer} onSubmit={registrationSubmit}>
            <div className={s.container}>
                <h1>Registration</h1>
                <img src={regIcon} alt={'Registration'}/>
                <SuperInputText
                    value={email}
                    name={'email'}
                    placeholder={'Email'}
                    type={'text'}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className={commonStyles.inputWrapper}>
                    <SuperInputText
                        value={password}
                        name={'password'}
                        placeholder={'Password'}
                        type={visibleOneInput ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img className={commonStyles.viewImg}
                         onClick={() => setVisibleOneInput(!visibleOneInput)}
                         src={visibleOneInput ? noView : view}
                         alt={'view'}/>
                </div>
                <div className={commonStyles.inputWrapper}>
                    <SuperInputText
                        value={repeatPassword}
                        className={commonStyles.passwordField}
                        name={'repeatPassword'}
                        placeholder={'Repeat Password'}
                        type={visibleTwoInput ? 'text' : 'password'}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <img className={commonStyles.viewImg}
                         onClick={() => setVisibleTwoInput(!visibleTwoInput)}
                         src={visibleTwoInput ? noView : view}
                         alt={'view'}/>
                </div>

                <div className={commonStyles.errorWrapper}>
                    {error && <span className={commonStyles.error}>{error}</span>}
                </div>
                {status === 'loading' ? <Loader/> :
                    <SuperButton type={'submit'} disabled={!!error}>
                        Create account
                    </SuperButton>
                }
            </div>
        </form>
    )
}