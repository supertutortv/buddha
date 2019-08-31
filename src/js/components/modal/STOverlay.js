import { useState } from 'react'

export default ({children}) => {
    const [state, setState] = useState([])

    return (
        <st-overlay class="activation">
            <div>
                {children}
            </div>
        </st-overlay>
    )
}