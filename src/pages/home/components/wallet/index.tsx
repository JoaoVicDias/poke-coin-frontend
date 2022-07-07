import React from 'react'

import Indicators from '../../../../components/indicators'

import { currency } from '../../../../utils/currency'

import classes from './index.module.css'

import { IWallet } from '../../../../types/home/index'

const Wallet: React.FC<IWallet> = ({ amountSpent, currentValue, loading }) => (
    <article className={classes.article_wallet__container}>
        {
            loading ? <span> Carregando... </span>
                :
                <>
                    <div>
                        <h4>Saldo:</h4>
                        <h2>
                            {
                                currency(currentValue)
                            }
                        </h2>
                    </div>
                    <Indicators amountSpent={amountSpent} currentValue={currentValue} />
                </>
        }
    </article>
)


export default Wallet