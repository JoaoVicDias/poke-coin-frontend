import React from 'react'

import PokemonCard from '../pokemonCard'

import classes from './index.module.css'

import { IListPokemonsProps } from '../../types/pokemons/index'

const ListPokemons: React.FC<IListPokemonsProps> = ({
    pokemons,
    top,
    buttonContent,
    classNameButton,
    loading,
    isEmpty,
    onOpenPokemonModalHandler
}) => {

    if (loading) {
        return <h4 className={classes.h4_feedback__message}>Carregando ...</h4>
    }

    if (isEmpty) {
        return <h4 className={classes.h4_feedback__message}> Nenhum pokemon encontrado! </h4>
    }

    return (
        <ul className={classes.ul_list_pokemon__container}>
            {
                pokemons.map((pokemon) => pokemon.amount === 0 ? null : (
                    <PokemonCard
                        key={pokemon.name}
                        pokemonUrl={pokemon.url}
                        top={top}
                        buttonContent={buttonContent}
                        classNameButton={classNameButton}
                        onOpenPokemonModalHandler={onOpenPokemonModalHandler}
                        {...pokemon}
                    />
                ))
            }
        </ul>
    )
}


export default ListPokemons