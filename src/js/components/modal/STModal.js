import React from 'react'
import * as comps from './comps'

const STModal = (props) => {
    let { open } = props
    if (!open) return null

    let { xtraClass, mData, action, orientation = 'bottom', addDl, refr, modalActive, color, test, children } = props

    const ModalComp = comps[action] || ''

    var style = color ? {borderColor: color} : {}
    
    return (
        <aside className={['stModal',orientation, xtraClass].join(' ')} onClick={(e) => {
            if (e.target.classList.contains("stModal")) modalActive({open: false})
        }}>
            <div className="stModalInner" style={style}>
                {children || <ModalComp test={test} refDls={refr} reportDl={addDl} color={color} data={mData} />}
            </div>
        </aside>
    )
}

export default STModal