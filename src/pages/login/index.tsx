import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import FormLogin from './components/formLogin'

import { onValidationFormHandler } from '../../utils/inputValidation'

import useUser from '../../contexts/userContext'

import { onLogin, onCreateAccount } from '../../services/pokeCoinApi'

import classes from './index.module.css'

import { IFormInputsState } from '../../types/login/index'

const Login: React.FC = () => {

    const { onSignInHandler } = useUser()

    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formInputs, setFormInputs] = useState<IFormInputsState>({
        email: {
            name: 'email',
            value: '',
            placeHolder: 'Email',
            type: 'email',
            isValid: false,
            validationRules: {
                isEmail: true
            }
        },
        password: {
            name: 'password',
            value: '',
            placeHolder: 'Senha',
            type: 'password',
            isValid: false,
            validationRules: {
                minLength: 6
            }
        }
    })

    const formInputsList = useMemo(() => {
        const keys = Object.keys(formInputs)
        return keys.map(key => ({ ...formInputs[key] })).filter(input => input)
    }, [formInputs])

    const formInputsIsValid = useMemo(() => {
        return !!!formInputsList.find(input => !input.isValid)
    }, [formInputsList])

    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormInputs(prevState => ({
            ...prevState,
            [event.target.name]: {
                ...prevState[event.target.name],
                value: event.target.value,
                isValid: onValidationFormHandler(prevState[event.target.name].validationRules, event.target.value)
            }
        }))
    }, [])

    const onToggleIsLoginHandler = useCallback(() => {
        return setIsLogin(prevState => !prevState)
    }, [])

    const onAddNameInputHandler = useCallback(() => {
        return setFormInputs(prevState => ({
            name: {
                name: 'name',
                value: '',
                placeHolder: 'Nome',
                type: 'type',
                isValid: false,
                validationRules: {
                    isRequired: true
                }
            },
            ...prevState
        }))
    }, [])

    const onRemoveNameInputHandler = useCallback(() => {
        return setFormInputs(prevState => {
            let newState = { ...prevState }

            delete newState['name']

            return newState
        })
    }, [])

    const onClearInputsHandler = useCallback(() => {
        return setFormInputs(prevState => {
            let newState = { ...prevState }

            for (let key in prevState) {
                newState = {
                    ...newState,
                    [key]: {
                        ...newState[key],
                        isValid: false,
                        value: ''
                    }
                }
            }

            return newState
        })
    }, [])

    const onLoginHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await onLogin(formInputs.email.value, formInputs.password.value)
            onSignInHandler(res.data)
            toast.success('Entrou com sucesso!')
            onClearInputsHandler()

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
        setLoading(false)

    }, [formInputs.email.value, formInputs.password.value, onSignInHandler, onClearInputsHandler])

    const onCreateAccountHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await onCreateAccount(
                formInputs.name.value,
                formInputs.email.value,
                formInputs.password.value
            )
            onSignInHandler(res.data)
            toast.success('Conta criada com sucesso!')
            onClearInputsHandler()

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
        setLoading(false)
    }, [formInputs.email.value, formInputs?.name?.value, formInputs.password.value, onSignInHandler, onClearInputsHandler])

    const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isLogin) {
            onLoginHandler()
        } else {
            onCreateAccountHandler()
        }
    }, [isLogin, onCreateAccountHandler, onLoginHandler])

    useEffect(() => {
        if (isLogin) {
            onRemoveNameInputHandler()
        } else {
            onAddNameInputHandler()
        }
    }, [formInputs.name, isLogin, onAddNameInputHandler, onRemoveNameInputHandler])

    return (
        <div className={classes.div_login__container} >
            <FormLogin
                inputs={formInputsList}
                onChange={onChangeHandler}
                isDisabled={!formInputsIsValid}
                isLogin={isLogin}
                loading={loading}
                onToggleIsLoginHandler={onToggleIsLoginHandler}
                onSubmit={onSubmitHandler}
            />
        </div>
    )
}

export default Login