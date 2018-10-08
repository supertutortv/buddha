import React from 'react'
import * as comps from './comps'


export default class STModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { data, open, action, orientation, modalActive } = this.props

        if (!open) return null

        const ModalComp = comps[action] || ''
        
        return (
            <div className={"stModal "+(orientation || 'bottom')} onClick={(e) => {
                if (e.target.classList.contains("stModal")) modalActive({open: false})
            }}>
                <div className="stModalInner">
                    <ModalComp data={data} />
                </div>
            </div>
        )
    }
}