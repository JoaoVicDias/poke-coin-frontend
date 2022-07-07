import React, { useMemo } from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { MdHorizontalRule } from 'react-icons/md'

import classes from './index.module.css'

import { IIndicators } from '../../types/components/indicators'

const Indicators: React.FC<IIndicators> = ({ currentValue, amountSpent }) => {

    const percentage = useMemo(() => {
        if (currentValue === 0 && amountSpent === 0) return +(0).toFixed(3)

        return +((currentValue - amountSpent) / amountSpent * 100).toFixed(3)
    }, [amountSpent, currentValue])

    const indicatorsInformations = useMemo(() => {
        if (percentage < 0) {
            return {
                color: 'red',
                svg: <AiOutlineArrowDown />
            }
        }

        if (percentage === 0.000) {
            return {
                color: 'gray',
                svg: <MdHorizontalRule />
            }
        }
        if (percentage > 0) {
            return {
                color: 'green',
                svg: <AiOutlineArrowUp />
            }
        }

        return {
            color: 'green',
            svg: <AiOutlineArrowUp />
        }
    }, [percentage])

    return (
        <div
            className={classes.div_indicators__container}
            style={{ color: indicatorsInformations.color }}
        >
            <span> {percentage.toFixed(3)}% </span>
            {indicatorsInformations.svg}
        </div>
    )
}

export default Indicators