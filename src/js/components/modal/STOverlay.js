import React, { useState } from 'react'
import STRings from '../../svg/STRings'

export default ({className, data}) => {
    let inner = <STRings/>

    if (data !== null) {
        // do stuff
        inner = data
    }

    return (
        <st-overlay class={className}>
            <div>
                {inner}
            </div>
        </st-overlay>
    )
}