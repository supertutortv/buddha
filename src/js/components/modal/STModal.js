import React from 'react'
import * as comps from './comps'


export default class STModal extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        let { mData, open, action, orientation, state, params, addDl, modalActive, color } = this.props

        console.log(params)
        if (!open) return null

        const ModalComp = comps[action] || ''

        var style = color ? {borderColor: color} : {}
        
        return (
            <div className={"stModal "+(orientation || 'bottom')} onClick={(e) => {
                if (e.target.classList.contains("stModal")) modalActive({open: false})
            }}>
                <div className="stModalInner" style={style}>
                    <ModalComp dls={state} reportDl={addDl} color={color} data={mData} />
                </div>
            </div>
        )
    }
}