import React, { useCallback, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import Modal from "../modal";

import { currency } from "../../utils/currency";

import classes from './index.module.css'

import { IPokemonModal } from '../../types/components/pokemonModal'

const PokemonModal: React.FC<IPokemonModal> = ({ contentSubmitButton, isOpen, onClose, onSubmit, imgUrl, name, price }) => {

    const [amount, setAmount] = useState('0')

    const onChangeInputHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        return setAmount(event.target.value)
    }, [])

    const onSumOneHandler = useCallback(() => {
        return setAmount(prevState => {
            let number = +prevState

            const newState = number += 1

            return newState.toString()
        })
    }, [])

    const onDecreasesOneHandler = useCallback(() => {
        return setAmount(prevState => {
            if (+prevState === 0) return prevState.toString()
            let number = +prevState

            const newState = number -= 1

            return newState.toString()
        })
    }, [])

    const onClosePokemonModalHandler = useCallback(() => {
        onClose()
        setAmount('0')
    }, [onClose])

    return (
        <Modal onClose={onClosePokemonModalHandler} isOpen={isOpen}>
            <form className={classes.form__poke_modal__container} onSubmit={(event) => onSubmit(event, name, +amount, onClosePokemonModalHandler)} >
                <img
                    src={imgUrl}
                    className={classes.img__poke_modal}
                    alt='poke'
                />
                <h2 className={classes.h2__poke_name}>{name}</h2>
                <p className={classes.p__poke_price}> {currency(price)} </p>
                <p className={classes.p__poke_price}> Valor Total: {currency(+amount * price)} </p>

                <div className={classes.div_input_container}>
                    <button className={classes.button_input} type="button" onClick={onDecreasesOneHandler}>
                        <AiOutlineMinus className={classes.svg_button_input} />
                    </button>
                    <input
                        className={classes.input_number}
                        type="number"
                        value={amount}
                        onChange={(event) => onChangeInputHandler(event)}
                        step={1}
                        min={1}
                    />
                    <button className={classes.button_input} type="button" onClick={onSumOneHandler}>
                        <AiOutlinePlus className={classes.svg_button_input} />
                    </button>
                </div>

                <div className={classes.div_action_buttons__container}>
                    <button
                        type="button"
                        onClick={onClosePokemonModalHandler}
                        className={`${classes.button_action} ${classes.button_cancel}`}>
                        Cancelar
                    </button>
                    <button type="submit" className={`${classes.button_action} ${classes.button_submit}`}>{contentSubmitButton}</button>
                </div>
            </form>
        </Modal>
    )
}

export default PokemonModal