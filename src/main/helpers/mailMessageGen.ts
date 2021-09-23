import {instance} from '../dal/api';
import {PATH} from '../ui/routes/Routes';

const mailMessageGenerator = () => {
    return `<div style="padding: 15px">\t\n
                    <h1>IT-INCUBATOR</h1>
                    \tPassword recovery link: \n
                    \t<a href=\`http://localhost:3000/#${PATH.NEW_PASS}/$token$\`>click here</a></div>`
};


export const mailMessageData = {
    from: 'test-front-admin,<makenaJun@gmail.com>',
    message: mailMessageGenerator(),
}