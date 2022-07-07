import React from 'react'

import HistoricItem from '../historicItem'

import classes from './index.module.css'

import { IListHistoric } from '../../../../types/Historic/index'

const ListHistoric: React.FC<IListHistoric> = ({ historic, loading, isEmpty }) => {

    if (loading) {
        return <h4 className={classes.h4_feedback__message}>Carregando...</h4>
    }

    if (isEmpty) {
        return <h4 className={classes.h4_feedback__message}> Você não tem Histórico. </h4>
    }

    return (
        <ul className={classes.ul_list_historic__container}>
            {
                historic.map(item => (
                    <HistoricItem key={item.id} {...item} />
                ))
            }
        </ul>
    )
}


export default ListHistoric