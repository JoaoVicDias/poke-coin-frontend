import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { toBitcoin } from 'satoshi-bitcoin-ts'
import { toast } from "react-toastify";

import PokemonTypesItem from "../pokemonTypesItem";
import Indicators from "../indicators";

import { ReactComponent as PokeballSvg } from '../../assets/pokeball.svg'

import { onGetCurrentBTCValue } from '../../services/btcApi'

import PokemonTypesColors from "../../utils/pokemonTypesColors";
import { currency } from "../../utils/currency";

import classes from './index.module.css'

import { PokemonCardProps, IPokemonInformations } from '../../types/pokemons/index'

const PokemonCard: React.FC<PokemonCardProps> = ({
    pokemonUrl,
    amount,
    amountSpent,
    currentValue,
    top,
    buttonContent,
    classNameButton,
    onOpenPokemonModalHandler
}) => {

    const isMounted = useRef(false)

    const [pokemonInformations, setPokemonInformations] = useState<IPokemonInformations>({
        id: '',
        name: '',
        types: [],
        defaultImg: '',
        base_experience: 0
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [bitcoin, setBitcoin] = useState(0)

    const colorShouldUser = useMemo(() => (
        PokemonTypesColors.find(type => type.type === pokemonInformations.types[0]?.type.name)?.color
    )
        , [pokemonInformations])

    const pokemonPrice = useMemo(() => bitcoin * toBitcoin(pokemonInformations.base_experience),
        [bitcoin, pokemonInformations.base_experience])

    const onFetchPokemonInformationsHandler = useCallback(async () => {
        try {
            setLoading(true)
            const res = await axios.get(pokemonUrl)
            if (!isMounted.current) return
            setPokemonInformations({
                id: res.data.id,
                name: res.data.name,
                types: res.data.types,
                defaultImg: res.data.sprites?.other['official-artwork'].front_default,
                base_experience: res.data.base_experience
            })

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }

        setLoading(false)
    }, [pokemonUrl, isMounted])

    const onFetchBitcoinValueHandler = useCallback(async () => {
        try {
            const res = await onGetCurrentBTCValue()
            setBitcoin(+res.data.data.amount)

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
    }, [])

    useEffect(() => {
        isMounted.current = true
        onFetchPokemonInformationsHandler()

        return () => { isMounted.current = false };
    }, [onFetchPokemonInformationsHandler])

    useEffect(() => {
        onFetchBitcoinValueHandler()
    }, [onFetchBitcoinValueHandler])

    return (
        <li className={classes.li_pokemon_card_container} style={{ backgroundColor: colorShouldUser || '#fff' }}>
            <div className={classes.div_left_side_container}>
                <span className={classes.span_pokemon__id}>#{pokemonInformations.id}</span>
                <h4 className={classes.h4_pokemon__name}> {pokemonInformations.name} </h4>
                <p className={classes.p_pokemon__information}>Preço: {currency(pokemonPrice)}</p>

                {currentValue && <p className={classes.p_pokemon__information}>Valor atual: {currency(currentValue)}</p>}
                {amount && <p className={classes.p_pokemon__information}>Qtde: {amount}</p>}
                {amountSpent && currentValue && <Indicators amountSpent={amountSpent} currentValue={currentValue} />}

                <button
                    className={`${classes.button_pokemon_card} ${classNameButton}`}
                    onClick={() => onOpenPokemonModalHandler(pokemonInformations.defaultImg, pokemonInformations.name, pokemonPrice)}
                >{buttonContent}</button>

                <ul className={classes.ul_types__container}>
                    {
                        pokemonInformations.types.map((type) => (
                            <PokemonTypesItem key={type.type.name} typeName={type.type.name} />
                        ))
                    }
                </ul>
            </div>
            <div className={classes.div_right_side_container}>
                <PokeballSvg className="svg__pokeball" />
            </div>
            {
                !loading && <img
                    className={classes.img__pokemon}
                    style={{ top: top }}
                    src={pokemonInformations.defaultImg}
                    alt={pokemonInformations.name}
                    loading="lazy"
                />
            }
        </li>
    )
}

export default PokemonCard