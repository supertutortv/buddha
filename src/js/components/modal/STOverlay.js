import { useState } from 'react'

export default ({children}) => {
    const [state, setState] = useState([])

    return (
        <st-overlay className="activation">
            <div>
                {children}
            </div>
        </st-overlay>
    )
}