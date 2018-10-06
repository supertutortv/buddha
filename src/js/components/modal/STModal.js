import React from 'react'
import ModalComp from './ModalComp'

const STModal = ({open,action,orientation,modalActive}) => {
    if (!open)
        return null
    else
        return (
            <div className={"stModal "+(orientation || 'bottom')} onClick={(e) => {
                if (e.target.classList.contains("stModal")) modalActive({open: false})
            }}>
                <div className="stModalInner">
                    <ModalComp comp={action} />
                </div>
            </div>
        )
}

export default STModal