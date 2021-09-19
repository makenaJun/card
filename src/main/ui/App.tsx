import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../../features/Login/Login';
import {Error404} from '../../features/Error404/Error404';
import {Profile} from '../../features/Profile/Profile';
import {TestComponents} from '../../features/TestComponents/TestComponents';
import {Registration} from '../../features/Registration/Registration';
import {PassRecovery} from '../../features/PassRecovery/PassRecovery';
import {Reminder} from '../../features/Reminder/Reminder';
import {NewPassword} from '../../features/NewPassword/NewPassword';
import {PATH} from './routes/Routes';
import {Header} from './header/Header';

function App() {

    return (

        <div className="App">
            <Header/>
            <Switch>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.REMINDER} render={() => <Reminder/>}/>
                <Route path={PATH.NEW_PASS} render={() => <NewPassword/>}/>
                <Route path={PATH.PASS_RECOVERY} render={() => <PassRecovery/>}/>
                <Route path={PATH.TEST} render={() => <TestComponents/>}/>
                <Route path={PATH.ERROR404} render={() => <Error404/>}/>
                <Redirect from={'*'} to={PATH.ERROR404}/>
            </Switch>
        </div>
    );
}

export default App;
