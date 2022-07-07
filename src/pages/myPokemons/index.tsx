import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { toast } from 'react-toastify';

import Filter from '../../components/filter'
import ListPokemons from '../../components/listPokemon'
import Content from '../../components/content';
import PokemonModal from '../../components/pokemonModal';

import { onGetMyPokemons, onSalePokemon } from '../../services/pokeCoinApi'

import classes from './index.module.css'

import { IPokemonModalState, IPokemons, IMyPokemonsPage, IFilterState } from '../../types/pokemons/index'

const MyPokemons: React.FC<IMyPokemonsPage> = ({ onFetchWalletHandler }) => {

    const filterTimeOut = useRef<NodeJS.Timeout | any>(null)

    const [filter, setFilter] = useState<IFilterState>({ name: '' })
    const [loading, setLoading] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [filteredData, setFilteredData] = useState<IPokemons[]>([])
    const [pokemons, setPokemons] = useState<IPokemons[]>([])
    const [pokemonModal, setPokemonModal] = useState<IPokemonModalState>({ imgUrl: '', isOpen: false, name: '', price: 0 })


    const filterConfigMemo = useMemo(() => [
        {
            filterName: 'name',
            placeholder: 'Qual Pokémon você está procurando ?',
            filterType: 'text'
        }
    ], [])

    const onSetFilterHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        setFilter((prevState: IFilterState) => ({ ...prevState, [filterName]: event.target.value }))
    }, [])

    const onFetchMyPokemonsHandler = useCallback(async () => {
        try {
            const res = await onGetMyPokemons()
            setPokemons(res.data.map((pokemon: IPokemons) => ({
                name: pokemon.name,
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
                amount: pokemon.amount,
                amountSpent: pokemon.amountSpent,
                currentValue: pokemon.currentValue
            })))

            if (res.data.length === 0) setIsEmpty(true)

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }

        setLoading(false)
    }, [])

    const onFilterHandler = useCallback(() => {
        clearTimeout(filterTimeOut.current)

        filterTimeOut.current = setTimeout(() => {
            const filteredPokemons = Object.entries(filter).reduce((item, [key, value]) => {
                return item.filter((pokemon: IPokemons | any) => pokemon[key].trim().toLowerCase().includes(String(value).trim().toLowerCase()))
            }, pokemons)

            setIsEmpty(!loading && filteredPokemons.length === 0)
            setFilteredData(filteredPokemons)
        }, 100)

    }, [filter, loading, pokemons])

    const onOpenPokemonModalHandler = useCallback((imgUrl: string, name: string, price: number) => {
        return setPokemonModal({ imgUrl, name, isOpen: true, price })
    }, [])

    const onClosePokemonModalHandler = useCallback(() => {
        return setPokemonModal({ imgUrl: '', isOpen: false, name: '', price: 0 })
    }, [])

    const onSalePokemonHandler = useCallback(async (
        event: React.FormEvent<HTMLFormElement>,
        name: string,
        amount: number,
        onClose: () => void
    ) => {
        event.preventDefault()

        if (amount <= 0) {
            return toast.error('Por favor insira um valor valido!')
        }

        try {
            await onSalePokemon(name, amount)
            onClose()
            onFetchMyPokemonsHandler()
            onFetchWalletHandler()
            toast.success('Venda feita com sucesso!')
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
    }, [onFetchMyPokemonsHandler, onFetchWalletHandler])

    useEffect(() => {
        onFetchMyPokemonsHandler()
    }, [onFetchMyPokemonsHandler])

    useEffect(() => {
        onFilterHandler()
    }, [onFilterHandler])

    return (
        <Content>
            <PokemonModal
                contentSubmitButton='Vender'
                imgUrl={pokemonModal.imgUrl}
                isOpen={pokemonModal.isOpen}
                name={pokemonModal.name}
                price={pokemonModal.price}
                onClose={onClosePokemonModalHandler}
                onSubmit={onSalePokemonHandler}
            />
            <Filter filterConfig={filterConfigMemo} onActionFilter={onSetFilterHandler} />
            <ListPokemons
                pokemons={filteredData}
                classNameButton={classes.button_sale}
                buttonContent="Vender"
                top='initial'
                loading={loading}
                isEmpty={isEmpty}
                onOpenPokemonModalHandler={onOpenPokemonModalHandler}
            />

        </Content>
    )
}

export default MyPokemons