import React, {useState} from 'react';
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText';
import SuperButton from '../../main/ui/common/SuperButton/SuperButton';
import styles from './TestComponents.module.css';
import {Paginator2} from "../../main/ui/common/Pagination/Paginator2";


export const TestComponents = () => {

    let allCards = [
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yrehrghoo', age: 445},
        {name: '1111', age: 45},
        {name: '444444', age: 65},
        {name: '555', age: 455},
        {name: 'yoo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
        {name: 'yoo', age: 4},
        {name: 'rrhrhr', age: 45},
        {name: 'rhreha', age: 5},
        {name: 'yoo', age: 45},
        {name: 'yoeggeo', age: 45},
        {name: 'yoo', age: 45},
        {name: 'yoewgego', age: 45},
    ]

    return (
        <div className={styles.wrapper}>
            Input:
            <SuperInputText/>
            CheckBox:
            <SuperCheckbox/>
            Button:
            <SuperButton>Send</SuperButton>
            <br/>
           <Paginator2 />
        </div>
    );
};