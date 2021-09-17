import React from 'react';
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox';
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText';
import SuperButton from '../../main/ui/common/SuperButton/SuperButton';
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