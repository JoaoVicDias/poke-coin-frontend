import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode'

import { IUserContext, IUserContextProvider, IUserInfoState } from '../types/contexts/userContext'

const userContext = createContext({} as IUserContext)


export const UserContextProvider: React.FC<IUserContextProvider> = ({ children }) => {

    const userToken = localStorage.getItem("poke-coin")
    const expTimeTimeout = useRef<NodeJS.Timeout | any>()

    const [isLogged, setIsLogged] = useState<boolean>(!!userToken)
    const [userInfo, setUserInfo] = useState<IUserInfoState>(userToken ? jwtDecode(userToken) : {
        id: "",
        email: "",
        exp: 0,
        iat: 0,
        name: "",
    })

    const onSignInHandler = useCallback((token: string) => {
        const decodedUser: IUserInfoState = jwtDecode(token)
        setIsLogged(true)
        localStorage.setItem("poke-coin", token)
        setUserInfo(decodedUser)
    }, [])

    const onLogoutHandler = useCallback(() => {
        setIsLogged(false)
        localStorage.removeItem("poke-coin")
        setUserInfo({
            id: "",
            email: "",
            exp: 0,
            iat: 0,
            name: "",
        })
    }, [])

    const onCheckAutoLogin = useCallback(() => {
        if (!userToken) return

        const todayTime = new Date().getTime();
        const decodedToken: IUserInfoState = jwtDecode(userToken)

        if (todayTime < (decodedToken.exp * 1000)) {
            onSignInHandler(userToken)
        } else {
            onLogoutHandler()
        }

    }, [userToken, onSignInHandler, onLogoutHandler])

    const onExpirationTokenHandler = useCallback(() => {
        if (!userToken) return

        const decodedToken: IUserInfoState = jwtDecode(userToken)

        clearTimeout(expTimeTimeout.current)

        const todayTime = new Date().getTime()
        const tokenExpTime = decodedToken.exp * 1000

        const expTime = tokenExpTime - todayTime

        setTimeout(onLogoutHandler, expTime)

    }, [onLogoutHandler, userToken])

    useEffect(() => {
        onCheckAutoLogin()
    }, [onCheckAutoLogin])

    useEffect(() => {
        onExpirationTokenHandler()
    }, [onExpirationTokenHandler])

    return (
        <userContext.Provider value={{
            isLogged,
            onLogoutHandler,
            userInfo,
            onSignInHandler
        }}>
            {children}
        </userContext.Provider>
    )
}


const useUser = () => {
    const useUserContext = useContext(userContext)

    return { ...useUserContext }
}

export default useUser
