import React from 'react';
import {Link} from 'react-router-dom';

export const PATH = {
    LOGIN: '/login',
    PROFILE: '/profile',
    REGISTRATION: '/register',
    REMINDER: '/reminder',
    PASS_RECOVERY: '/passrecovery',
    NEW_PASS: '/newpass',
    ERROR404: '/404',
    TEST: '/test',
};

const Routes = () => {
    const stylesLinksWrapper = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        background: '#ccc',
        padding: '10px'
    }

    return (
        <div style={stylesLinksWrapper}>
            <Link to={PATH.TEST} title={'Тестовая страница'} >Test</Link>
            <Link to={PATH.LOGIN} title={'Страница логинизации'}>Login</Link>
            <Link to={PATH.PROFILE} title={'Страница профиля'}>Profile</Link>
            <Link to={PATH.REGISTRATION} title={'Страница регистрации'}>Registration</Link>
            <Link to={PATH.REMINDER} title={'Страница напомнить пароль'}>Reminder</Link>
            <Link to={PATH.PASS_RECOVERY} title={'Страница восстановления пароля'}>Password Recovery</Link>
            <Link to={PATH.NEW_PASS} title={'Страница ввода нового пароля'}>New Password</Link>
        </div>
    );
};

export default Routes;