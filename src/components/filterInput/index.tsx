import React from 'react'

import classes from './index.module.css'

import { IIpuntProps } from '../../types/components/filterInput'

const filterInput: React.FC<IIpuntProps> = ({ name, className, placeHolder, type, onChange }) =>
    <input
        type={type}
        name={name}
        placeholder={placeHolder}
        className={`${classes.input_filter__container} ${className}`}
        onChange={onChange}
        autoComplete='off'
    />


export default filterInput