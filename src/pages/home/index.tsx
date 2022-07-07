import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Header from '../../components/header'
import Wallet from './components/wallet'
import Navigation from './components/navigation'
import Pokemons from '../pokemons'
import MyPokemons from '../myPokemons'
import Historic from '../historic'

import { onGetWallet } from '../../services/pokeCoinApi'

import classes from './index.module.css'

import { INavigateState, IWalletState } from '../../types/home/index'

const Home: React.FC = () => {

    const [wallet, setWallet] = useState<IWalletState>({ currentValue: 0, amountSpent: 0 })
    const [loading, setLoading] = useState(true)
    const [navigation, setNavigation] = useState<INavigateState>({
        historic: {
            isOpen: false,
            name: "Histórico"
        },
        myPokemons: {
            isOpen: true,
            name: "Meus pokemons"
        },
        pokemons: {
            isOpen: false,
            name: "Pokemons"
        }
    })

    const navigationList = useMemo(() => {
        const list = []

        for (let key in navigation) {
            list.push({ name: navigation[key].name, isOpen: navigation[key].isOpen })
        }

        return list
    }, [navigation])

    const onFetchWalletHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await onGetWallet();
            setWallet(res.data)
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
        setLoading(false)
    }, [])

    const onChangeNavigationHandler = useCallback((name: string) => {
        return setNavigation(prevState => {
            let newState = { ...prevState }

            for (let key in newState) {
                if (newState[key].name !== name) {
                    newState = { ...newState, [key]: { ...newState[key], isOpen: false } }
                    continue
                }
                newState = { ...newState, [key]: { ...newState[key], isOpen: true } }
            }

            return newState
        })
    }, [])

    const contentToRender = useMemo(() => {
        if (navigation.pokemons.isOpen) {
            return <Pokemons onFetchWalletHandler={onFetchWalletHandler} />
        }

        if (navigation.myPokemons.isOpen) {
            return <MyPokemons onFetchWalletHandler={onFetchWalletHandler} />
        }

        if (navigation.historic.isOpen) {
            return <Historic />
        }

        return <MyPokemons onFetchWalletHandler={onFetchWalletHandler} />
    }, [navigation, onFetchWalletHandler])

    useEffect(() => {
        onFetchWalletHandler()
    }, [onFetchWalletHandler])

    return (
        <div className={classes.div_home__container}>
            <Header />
            <main>
                <Wallet loading={loading} {...wallet} />
                <Navigation
                    navigationList={navigationList}
                    onChangeNavigationHandler={onChangeNavigationHandler}
                />
                {contentToRender}
            </main>
        </div>
    )
}

export default Home