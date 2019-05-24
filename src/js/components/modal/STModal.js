import React from 'react'
import * as comps from './comps'

const STModal = ({ mData, open, action, orientation = 'bottom', addDl, refr, modalActive, color, test, children }) => {
    //if (!open) return null

        const ModalComp = comps[action] || ''

        var style = color ? {borderColor: color} : {}
        
        return (
            <div className={['stModal',orientation].join(' ')} onClick={(e) => {
                if (e.target.classList.contains("stModal")) modalActive({open: false})
            }}>
                <div className="stModalInner" style={style}>
                    {children || <ModalComp test={test} refDls={refr} reportDl={addDl} color={color} data={mData} />}
                </div>
            </div>
        )
}

export default STModal