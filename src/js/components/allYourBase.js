import React from 'react'
import { GlobalState } from '../utilities/StateContext'

export default class allYourBase extends React.Component {
    render() {
        return(
            <GlobalState.Consumer>
                {context => {
                    context.bodyClass('allYourBase')
                    return (
                        <div style={{width:'100%',height:'100%',textAlign:'center',backgroundColor:'black'}}>
                            <img style={{width:'auto',height:'100%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
                        </div>
                    )
                }}
            </GlobalState.Consumer>
        )
    }
}
