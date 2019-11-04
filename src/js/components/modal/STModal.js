import React from 'react'
import * as comps from './comps'

const STModal = (props) => {
    let { open } = props
    if (!open) return null

    let { dismissable, xtraClass, mData, action, actData, orientation = 'bottom', addDl, refr, modalActive, color, test, children } = props

    const closer = dismissable ? modalActive({
        open: false
    }) : null

    const ModalComp = comps[action] || '',
        style = color ? {borderColor: color} : {}
    
    return (
        <aside className={['stModal',orientation, xtraClass].join(' ')} onClick={closer}>
            <div className="stModalInner" style={style} onClick={e => e.stopPropagation()}>
                {children || <ModalComp test={test} refDls={refr} reportDl={addDl} color={color} data={mData || actData} />}
            </div>
        </aside>
    )
}

export default STModal