import React from 'react';
import {herokuAPI} from "../../api/Api";

export const Login = () => {
    debugger
    let ping =   herokuAPI.getPing()
    console.log(ping)
    return (

        <div>
            Login
        </div>
    );
};