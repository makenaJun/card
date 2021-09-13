import React from 'react';
import SuperCheckbox from '../../components/SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../components/SuperInputText/SuperInputText';
import SuperButton from '../../components/SuperButton/SuperButton';
import styles from './TestComponents.module.css';

export const TestComponents = () => {
    return (
        <div className={styles.wrapper}>
            Input:
            <SuperInputText/>
            CheckBox:
            <SuperCheckbox/>
            Button:
            <SuperButton>Send</SuperButton>
        </div>
    );
};