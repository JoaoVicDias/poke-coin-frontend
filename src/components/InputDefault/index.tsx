import React from 'react'

import { IInputDefault } from '../../types/components/InputDefault'

import classes from './index.module.css'

const InputDefault: React.FC<IInputDefault> = ({ onChange, placeHolder, type, value, className, name }) => (
    <input
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={(event) => onChange(event)}
        className={` ${classes.input__default} ${className}`}
        name={name}
    />
)


export default InputDefault