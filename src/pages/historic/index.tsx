import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Content from '../../components/content'
import ListHistoric from './components/ListHistoric'

import { onGetMyHistoric } from '../../services/pokeCoinApi'

import { IHistoricState } from '../../types/Historic/index'


const Historic: React.FC = () => {

    const [historic, setHistoric] = useState<IHistoricState[]>([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)

    const onFetchHistoricHandler = useCallback(async () => {
        setLoading(true)
        try {
            const res = await onGetMyHistoric()
            setHistoric(res.data)
            if (res.data.length === 0) setIsEmpty(true)
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message || "Algo de errado aconteceu, por favor tente novamente!")
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        onFetchHistoricHandler()
    }, [onFetchHistoricHandler])

    return (
        <Content>
            <ListHistoric
                loading={loading}
                historic={historic}
                isEmpty={isEmpty}
            />
        </Content>
    )
}

export default Historic