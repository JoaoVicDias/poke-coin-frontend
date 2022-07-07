import React from 'react'
import { MdCatchingPokemon } from 'react-icons/md'

import classes from './index.module.css'

import { IFormLogin } from '../../../../types/login/index'
import InputDefault from '../../../../components/InputDefault'

const FormLogin: React.FC<IFormLogin> = ({
    inputs,
    onChange,
    isDisabled,
    isLogin,
    loading,
    onToggleIsLoginHandler,
    onSubmit
}) => (
    <form className={classes.form_login__container} onSubmit={(event) => onSubmit(event)}>
        <h1 className={classes.h1_login__title}>PokeCoin</h1>
        <MdCatchingPokemon className={classes.svg_login__logo} />
        <div className={classes.div__inputs__container}>
            {
                inputs.map(input => (
                    <InputDefault key={input.name} onChange={onChange} {...input} />
                ))
            }
        </div>
        <button disabled={isDisabled} className={`${classes.button__form} ${loading ? classes.button__loading : ''}`}>
            {loading ? '' : 'Enviar'}
        </button>
        <small className={classes.small__message}>
            {isLogin ? 'Não tem uma conta ?' : 'Já tem uma conta ?'}<span onClick={onToggleIsLoginHandler}>clique aqui!</span>
        </small>
    </form>
)


export default FormLogin