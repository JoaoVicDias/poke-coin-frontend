import React from 'react'

import classes from './index.module.css'

import { IContent } from '../../types/components/content'

const Content: React.FC<IContent> = ({ children }) => (
    <div className={classes.div_content__container}>
        {children}
    </div>
)


export default Content