import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { toast } from 'react-toastify';

import Filter from '../../components/filter'
import ListPokemons from '../../components/listPokemon'
import Content from '../../components/content';
import PokemonModal from '../../components/pokemonModal';

import { onPurchasePokemon } from '../../services/pokeCoinApi';

import classes from './index.module.css'

import { IPaginateState, IPokemonModalState, IPokemons, IPokemonsPage, IFilterState } from '../../types/pokemons/index'


const Pokemons: React.FC<IPokemonsPage> = ({ onFetchWalletHandler }) => {

    const filterTimeOut = useRef<NodeJS.Timeout | any>(null)
    const perPage: number = 15

    const [paginate, setPaginate] = useState<IPaginateState>({ start: 0, end: perPage - 1 })
    const [filter, setFilter] = useState<IFilterState>({ name: '' })
    const [totalItems, setTotalItems] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [data, setData] = useState<IPokemons[]>([])
    const [filteredData, setFilteredData] = useState<IPokemons[]>([])
    const [pokemons, setPokemons] = useState<IPokemons[]>([])
    const [pokemonModal, setPokemonModal] = useState<IPokemonModalState>({ imgUrl: '', isOpen: false, name: '', price: 0 })

    const checkHasMoreItems = useMemo(() => filteredData.length >= paginate.end, [filteredData.length, paginate.end])

    const filterConfigMemo = useMemo(() => [
        {
            filterName: 'name',
            placeholder: 'Qual Pokémon você está procurando ?',
            filterType: 'text'
        }
    ], [])

    const onNextPageHandler = useCallback(() => (
        setPaginate(prevState => ({ ...prevState, end: prevState.end + perPage }))
    ), [])

    const onAddItemsToNextPageHandler = useCallback(() => {
        let pokemonsToShow: IPokemons[] = []

        pokemonsToShow = filteredData.filter((_, index) => index >= paginate.start && index <= paginate.end)

        return setPokemons(pokemonsToShow)

    }, [filteredData, paginate])

    const onSetFilterHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
        setFilter((prevState: IFilterState) => ({ ...prevState, [filterName]: event.target.value }))
    }, [])

    const onFetchCountPokemonsHandler = useCallback(async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
            setTotalItems(res.data.count)
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
    }, [])

    const onFetchPokemonsHandler = useCallback(async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalItems}`)
            setData(res.data.results)

            if (res.data.results.length === 0) setIsEmpty(true)

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }

        setLoading(false)
    }, [totalItems])

    const onFilterHandler = useCallback(() => {
        clearTimeout(filterTimeOut.current)

        filterTimeOut.current = setTimeout(() => {
            const filteredPokemons = Object.entries(filter).reduce((item, [key, value]) => {
                return item.filter((pokemon: IPokemons | any) => pokemon[key].trim().toLowerCase().includes(String(value).trim().toLowerCase()))
            }, data)

            setIsEmpty(!loading && filteredPokemons.length === 0)
            setFilteredData(filteredPokemons)
            setPokemons([])
            setPaginate({ start: 0, end: perPage - 1 })

        }, 100)

    }, [filter, data, loading])

    const onOpenPokemonModalHandler = useCallback((imgUrl: string, name: string, price: number) => {
        return setPokemonModal({ imgUrl, name, isOpen: true, price })
    }, [])

    const onClosePokemonModalHandler = useCallback(() => {
        return setPokemonModal({ imgUrl: '', isOpen: false, name: '', price: 0 })
    }, [])

    const onPurchasePokemonHandler = useCallback(async (
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
            await onPurchasePokemon(name, amount)
            onClose()
            onFetchPokemonsHandler()
            onFetchWalletHandler()
            toast.success('Compra feita com sucesso!')
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
    }, [onFetchPokemonsHandler, onFetchWalletHandler])

    useEffect(() => {
        onFetchCountPokemonsHandler()
    }, [onFetchCountPokemonsHandler])

    useEffect(() => {
        if (totalItems > 0) {
            onFetchPokemonsHandler()
        }
    }, [onFetchPokemonsHandler, totalItems])

    useEffect(() => {
        onFilterHandler()
    }, [onFilterHandler])

    useEffect(() => {
        onAddItemsToNextPageHandler()
    }, [onAddItemsToNextPageHandler])

    return (
        <Content>
            <PokemonModal
                contentSubmitButton='Comprar'
                imgUrl={pokemonModal.imgUrl}
                isOpen={pokemonModal.isOpen}
                name={pokemonModal.name}
                price={pokemonModal.price}
                onClose={onClosePokemonModalHandler}
                onSubmit={onPurchasePokemonHandler}
            />
            <Filter filterConfig={filterConfigMemo} onActionFilter={onSetFilterHandler} />
            <InfiniteScroll
                dataLength={pokemons.length}
                next={onNextPageHandler}
                hasMore={checkHasMoreItems}
                loader={<h4 className={classes.h4_loading__text}>Carregando ...</h4>}
                style={{ overflow: 'none' }}
            >
                <ListPokemons
                    pokemons={pokemons}
                    buttonContent="Comprar"
                    classNameButton={classes.button_purchase}
                    loading={loading}
                    isEmpty={isEmpty}
                    onOpenPokemonModalHandler={onOpenPokemonModalHandler}
                />
            </InfiniteScroll>
        </Content>
    )
}

export default Pokemons