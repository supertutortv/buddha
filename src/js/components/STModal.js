import React from 'react'

const STModal = ({type = 'default', children, closer = () => {}}) => {
    return (
        <div className={['stModal',type].join(' ')} onClick={(e) => e.target.classList.contains("stModal") && closer()}>
            <div className="stModalInner">
                {children}
            </div>
        </div>
    )
}

export default STModal