import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalState } from './StateContext'

const ST404 = () => {
    _st.bodyClass = 'notFound'
    return (
        <div style={{backgroundColor:'yellow',height:'100%',width:'100%'}}>Not found</div>
    )
}

export default ST404