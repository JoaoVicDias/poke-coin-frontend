import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '../../contexts/userContext';

import { IPrivateRouteProps } from '../../types/components/privateRoute'

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ element, shouldBeAuth }) => {

    const { isLogged } = useUser()

    const privateRouteComponent = useMemo(() => {
        if (shouldBeAuth) {
            if (isLogged) {
                return element
            } else {
                return <Navigate replace to="/login" />
            }
        } else {
            if (isLogged) {
                return <Navigate replace to="/" />
            } else {
                return element
            }
        }

    }, [isLogged, shouldBeAuth, element])

    return privateRouteComponent
}

export default PrivateRoute