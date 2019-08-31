import React from 'react'
import STRings from '../../svg/STRings'

export default ({close=()=>{},className='default', children}) => (
    <st-overlay class={className} onClick={close}>
        <div onClick={e => e.stopPropagation()}>
            {children || <STRings/>}
        </div>
    </st-overlay>
)