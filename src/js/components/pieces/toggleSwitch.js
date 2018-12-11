import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}
  
const defaultProps = {
    on: false,
    className: '',
    onClick: () => {}
}

const ToggleSwitch = ({on, onClick, className, children}) => {
    console.log(on)
    let classes = ['stSwitch',className,(on ? 'on':'')].join(' ')
    return (
        <div className={classes} onClick={(e) => onClick(e)}>
            <div className="stToggle">{children}</div>
        </div>
    )
}

ToggleSwitch.propTypes = propTypes
ToggleSwitch.defaultProps = defaultProps

export default ToggleSwitch