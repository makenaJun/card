import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    onClick?: () => void
    spanClassName?: string
    specialType?: "password" | "text"
    type?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        type, specialType,
        onClick,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === "Enter"
        && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`
    const finalInputClassName = `${
        error
            ? s.errorInput
            : s.superInput} ${className}`

    return (
        <div className={s.wrapper}>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            /> <i>{specialType && <span className={s.eye} onClick={onClick}>eye</span>}</i>
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default SuperInputText
