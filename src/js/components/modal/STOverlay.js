import React from 'react'
import STRings from '../../svg/STRings'

export default ({className='default', children}) => (
    <st-overlay class={className}>
        <div>
            {children || <STRings/>}
        </div>
    </st-overlay>
)