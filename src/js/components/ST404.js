import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalState } from './utilities/StateContext'

const ST404 = () => {
    return (
        <GlobalState.Consumer>
            {global => {
                global.bodyClass('notfound')
                return (
                    <div style={{backgroundColor:'white',height:'100%',width:'100%'}}>Not found</div>
                )
            }}
        </GlobalState.Consumer>
    )
}

export default ST404