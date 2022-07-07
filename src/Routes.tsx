import React from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'

import PrivateRoute from './components/privateRoute'

import Home from './pages/home'
import Login from './pages/login'

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' element={<PrivateRoute shouldBeAuth element={<Home />} />} />
        <Route path='/login' element={<PrivateRoute shouldBeAuth={false} element={<Login />} />} />

        <Route path='*' element={<Navigate replace to='/login' />} />
    </Switch>
)



export default Routes