import React from 'react'
import { GrSearch } from 'react-icons/gr'

import FilterInput from '../filterInput'

import classes from './index.module.css'

import { IFilterProps } from '../../types/components/filter'

const Filter: React.FC<IFilterProps> = ({ filterConfig, onActionFilter }) => (
    <div className={classes.div_filter__container}>
        {
            filterConfig.map((filter) => (
                <div className={classes.div_filter_inputs__container} key={filter.filterName}>
                    <div className={classes.div_search_image__container}>
                        <GrSearch className={classes.svg_search} />
                    </div>
                    <FilterInput
                        type={filter.filterType}
                        name={filter.filterName}
                        placeHolder={filter.placeholder}
                        onChange={(event) => onActionFilter(event, filter.filterName)}
                    />
                </div>
            ))
        }
    </div>
)


export default Filter