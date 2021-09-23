import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import SuperButton from '../../main/ui/common/SuperButton/SuperButton';
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText';
import styles from './Reminder.module.css';
import Loader from '../../main/ui/common/Loader/Loader';
import {PassRecovery} from '../PassRecovery/PassRecovery';
import {cleanUpState, reminderPassword, ResponseStatusType, setAppError} from '../../main/bll/app-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../main/bll/store';
import forgotIcon from '../../main/ui/images/icon/forgot.png';

export const Reminder = () => {
        const [email, setEmail] = useState<string>('');
        const loading = useSelector<AppStateType, ResponseStatusType>((state) => state.app.status);
        const error = useSelector<AppStateType, string | null>((state) => state.app.error);

        const dispatch = useDispatch();

        const cleanup = () => {
            dispatch(cleanUpState());
        }
        useEffect(() => {
            return cleanup;
        }, []);

        const sendMailHandler = () => {
            dispatch(reminderPassword(email));
        }
        const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
            setEmail(evt.currentTarget.value);
            error && dispatch(setAppError(null));
        }

        return (
            <div className={styles.wrapper}>
                {loading === 'success'
                    ? <PassRecovery email={email}/>
                    : <>
                        <h1>Forgot your password?</h1>
                        <img src={forgotIcon} alt={'Forgot'}/>
                        <div><SuperInputText error={error} placeholder={'Email'} value={email} onChange={onChangeHandler}/>
                        </div>
                        {loading === 'loading' ? <Loader/> :
                            <SuperButton onClick={sendMailHandler} disabled={!!error}>Send</SuperButton>}
                        <p>Did you remember your password?</p>
                        <Link to={'/login'} title={'Back to login page'}>Try logging in</Link>
                    </>
                }
            </div>
        );
    }
;