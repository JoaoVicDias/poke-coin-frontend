import React from 'react'
import useUser from '../../contexts/userContext'

import classes from './index.module.css'

const Header: React.FC = () => {

    const { userInfo, onLogoutHandler } = useUser()

    return (
        <header className={classes.header_home__container}>
            <div style={{width: '200px'}}></div>
            <h3 className={classes.h3_header__logo}> Poke Coin </h3>
            <div className={classes.div_header_message_container}>
                <span className={classes.span_header_message_text}> Olá {userInfo.name}, tudo bem ? </span>
                <button className={classes.button_header_logout} onClick={onLogoutHandler}> Sair </button>
            </div>
        </header>
    )
}

export default Header