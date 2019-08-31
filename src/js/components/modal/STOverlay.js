import { useState } from 'react'

export default ({data, children}) => {
    const [state, setState] = useState()

    return (
        <st-overlay class="activation">
            <div>
                {data}
            </div>
        </st-overlay>
    )
}