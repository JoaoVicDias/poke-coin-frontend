import React, { useMemo } from 'react'

import PokemonTypesColors from '../../utils/colorsToTypes'

import classes from './index.module.css'

import { IPokemonTypesItemProps } from '../../types/components/pokemonTypesItem'

const PokemonTypesItem: React.FC<IPokemonTypesItemProps> = ({ typeName, justIcon }) => {

    const selectTypesInformations = useMemo(() => PokemonTypesColors.find(type => type.type === typeName), [typeName])

    return (
        <li className={classes.li_type__container} style={{ backgroundColor: selectTypesInformations?.color || '#fff' }}>
            <img className={classes.img__type} src={selectTypesInformations?.image} alt={typeName} />
            {
                !justIcon &&
                <span className={classes.span_type__name}>
                    {typeName}
                </span>
            }

        </li>
    )
}

export default PokemonTypesItem