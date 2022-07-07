import React, { useCallback, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import classes from './index.module.css'

import { IModalProps } from '../../types/components/modal'

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null)

    const onHandleOnCloseFunction = useCallback((event: any) => {
        if (event.target.id === 'backdrop') onClose()
    }, [onClose])

    return (
        <CSSTransition nodeRef={modalRef} in={isOpen} timeout={200} classNames="modal-transition" unmountOnExit >
            <div className={classes.div_modal__container} ref={modalRef} id="backdrop" onClick={(event) => onHandleOnCloseFunction(event)}>
                {children}
            </div>
        </CSSTransition>
    )

}

export default Modal
