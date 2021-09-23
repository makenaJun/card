import React from 'react';
import checkEmail from '../../main/ui/images/icon/check-email.png';

type PropsType = {
    email: string,
}

export const PassRecovery = (props: PropsType) => {
    const {email} = props;

    return (
        <div>
            <h1>Check Email</h1>
            <img src={checkEmail} alt={'Check your Email'}/>
            <p>We've sent an Email with instructions to
                <br/>
                {email}
            </p>
        </div>
    );
};