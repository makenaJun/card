import {PATH} from '../ui/routes/Routes';

const isDev = process.env.NODE_ENV === 'development';

const mailMessageGenerator = () => {
    return `<div style="padding: 15px">\t\n
                    <h1>IT-INCUBATOR</h1>
                    \tPassword recovery link: \n
                    \t<a href=\`${isDev? 'http://localhost:3000' : 'https://makenajun.github.io/card'}/#${PATH.NEW_PASS}/$token$\`>click here</a></div>`
};


export const mailMessageData = {
    from: 'test-front-admin,<makenaJun@gmail.com>',
    message: mailMessageGenerator(),
}