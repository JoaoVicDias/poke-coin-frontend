import React from 'react'

import classes from './index.module.css'

import { INavigationItem } from '../../../../types/home'

const NavigationItem: React.FC<INavigationItem> = ({ isActive, name, onChangeNavigationHandler }) => (
    <li
        className={`${classes.li_navigation_item__container} ${isActive && classes.li__active}`}
        onClick={() => onChangeNavigationHandler(name)}
    >
        {name}
    </li>
)


export default NavigationItem