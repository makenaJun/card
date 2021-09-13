import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from './pages/Login/Login';
import {Error404} from './pages/Error404/Error404';
import {Profile} from './pages/Profile/Profile';
import {TestComponents} from './pages/TestComponents/TestComponents';
import {Registration} from './pages/Registration/Registration';
import {PassRecovery} from './pages/PassRecovery/PassRecovery';
import {Reminder} from './pages/Reminder/Reminder';
import {NewPassword} from './pages/NewPassword/NewPassword';

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/profile'} render={() => <Profile/>}/>
                    <Route path={'/register'} render={() => <Registration/>}/>
                    <Route path={'/reminder'} render={() => <Reminder/>}/>
                    <Route path={'/newpass'} render={() => <NewPassword/>}/>
                    <Route path={'/passrecovery'} render={() => <PassRecovery/>}/>
                    <Route path={'/test'} render={() => <TestComponents/>}/>

                    <Route path={'/404'} render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
