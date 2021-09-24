import React, {useEffect, useState} from 'react';
import SuperButton from '../../main/ui/common/SuperButton/SuperButton';
import styles from './NewPassword.module.css'
import view from '../../main/ui/images/icon/view.svg';
import noView from '../../main/ui/images/icon/no-view.svg';
import {Redirect, useLocation} from 'react-router-dom';
import {PATH} from '../../main/ui/routes/Routes';
import Loader from '../../main/ui/common/Loader/Loader';
import {ResponseStatusType, setAppError} from '../../main/bll/app-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../main/bll/store';
import newPassIcon from '../../main/ui/images/icon/folder.png';
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText';
import {cleanup} from '../../main/helpers/clean';
import {setNewPassword} from '../../main/bll/login-reducer';
import commonStyles from '../../main/ui/styles/commonStyles.module.css';


export const NewPassword = () => {
    //TODO redirect to profile if user is logged in

    const [onePassword, setOnePassword] = useState<string>('');
    const [twoPassword, setTwoPassword] = useState<string>('');

    const [visibleOneInput, setVisibleOneInput] = useState<boolean>(false);
    const [visibleTwoInput, setVisibleTwoInput] = useState<boolean>(false);

    const error = useSelector<AppStateType, string | null>(state => state.app.error);
    const status = useSelector<AppStateType, ResponseStatusType>(state => state.app.status);

    const dispatch = useDispatch();
    const location = useLocation();

    const token = location.pathname.split('/')[2];

    useEffect(() => {
        return () => cleanup(dispatch);
    }, []);

    const sendPasswordHandler = () => {
        const identical = onePassword === twoPassword;
        if (!identical) {
            dispatch(setAppError(`Passwords don't match!`));
        } else {
            dispatch(setNewPassword(token, onePassword));
        }
    }
    if (status === 'success') {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.wrapper}>
            <h1>Create new password</h1>
            <img src={newPassIcon} alt={'New Password'}/>
            <div className={commonStyles.inputWrapper}>
                <SuperInputText type={visibleOneInput ? 'text' : 'password'}
                       value={onePassword}
                       onChange={(e) => setOnePassword(e.currentTarget.value)}
                       placeholder={'New password'}/>

                <img className={commonStyles.viewImg}
                     onClick={() => setVisibleOneInput(!visibleOneInput)}
                     src={visibleOneInput ? noView : view}
                     alt={'view'}/>
            </div>

            <div className={commonStyles.inputWrapper}>
                <SuperInputText type={visibleTwoInput ? 'text' : 'password'}
                       value={twoPassword}
                       onChange={(e) => setTwoPassword(e.currentTarget.value)}
                       placeholder={'Repeat new password'}/>

                <img src={visibleTwoInput ? noView : view}
                     className={commonStyles.viewImg}
                     onClick={() => setVisibleTwoInput(!visibleTwoInput)}
                     alt={'view'}/>
            </div>
            <div className={commonStyles.errorWrapper}>
                {error && <span className={commonStyles.error}>{error}</span>}
            </div>
            {status === 'loading' ? <Loader/> :
                <SuperButton onClick={sendPasswordHandler}>Set new password</SuperButton>}
        </div>
    );
};