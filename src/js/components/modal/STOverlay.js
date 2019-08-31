import React, { useState } from 'react'
import STRings from '../../svg/STRings'

export default ({className, data}) => {
    //const [loading, setLoading] = useState(true)

    //setLoading = () => data === null ? true : false

    let inner = data || <STRings/>

    return (
        <st-overlay class={className}>
            <div>
                {inner}
            </div>
        </st-overlay>
    )
}