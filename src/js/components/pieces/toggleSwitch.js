import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    on: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    label: PropTypes.string
}
  
const defaultProps = {
    label: '',
    on: false,
    className: 'default',
    onClick: () => {}
}

const ToggleSwitch = ({label, on, onClick, className, children}) => {
    console.log(on)
    let classes = ['stSwitch',className,(on ? 'on':'')].join(' ')
    return (
        <React.Fragment>
            <div className={classes} onClick={(e) => onClick(e)}>
                <div className="stToggle">{children}</div>
            </div>
            {label ? <span className="label">{label}</span> : null}
        </React.Fragment>
    )
}

ToggleSwitch.propTypes = propTypes
ToggleSwitch.defaultProps = defaultProps

export default ToggleSwitch