import React from "react";

import NavigationItem from "../navigationItem";

import classes from './index.module.css'

import { INavigation } from "../../../../types/home";

const Navigation: React.FC<INavigation> = ({ navigationList, onChangeNavigationHandler }) => (
    <ul className={classes.ul_navigation__container}>
        {
            navigationList.map(item => (
                <NavigationItem
                    key={item.name}
                    name={item.name}
                    isActive={item.isOpen}
                    onChangeNavigationHandler={onChangeNavigationHandler}
                />
            ))
        }
    </ul>
)


export default Navigation