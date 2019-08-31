import React from 'react'
import STRings from '../../svg/STRings'

export default ({className='default', children}) => (
    <st-overlay class={className} onClick={(e) => {
        e.preventDefault()
        console.log(e.target, e.currentTarget)
    }}>
        <div>
            {children || <STRings/>}
        </div>
    </st-overlay>
)