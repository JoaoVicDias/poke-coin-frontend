import React from 'react'

import { currency } from '../../../../utils/currency'
import { convertDate } from '../../../../utils/convertDate'

import classes from './index.module.css'

import { IHistoricState } from '../../../../types/Historic/index'

const HistoricItem: React.FC<IHistoricState> = ({ amount, createdAt, name, price, type }) => (
    <li className={classes.li_historic_item__container}>
        <div >
            <h4 className={classes.h4_historic_item__name}>{name}</h4>
            <p
                className={`${classes.p_historic_item__type} ${type === 'purchase'
                    ? classes.p_type__purchase
                    : classes.p_type__sale}`}>
                {type === 'purchase' ? 'Compra' : 'Venda'}
            </p>
            <small className={classes.small_historic_item__amount}>Qtde: {amount}</small>
        </div>

        <p className={classes.p_historic_item__price}>Valor total: {currency(amount * price)} </p>
        <p className={classes.p_historic_item__price}>Unidade: {currency(price)} </p>

        <p className={classes.p_historic_item__date}>{convertDate(createdAt)}</p>
    </li>
)

export default HistoricItem