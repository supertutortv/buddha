import React from 'react'
import PropTypes from 'prop-types'
import icons from '../utilities/stsvg.js'

const STsvg = ({icon,height,width}) => {
    return (
        <svg viewBox={'0 0 '+width+' '+height}>
            <path d={icons[icon]} />
        </svg>
    )
}

STsvg.defaultProps = {
    icon: "alien01",
    height: 32,
    width: 32
}

export default STsvg