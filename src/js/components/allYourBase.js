import React from 'react'
import * as _st from '../classes/st'

const BODY_CLASS =  'allYourBase'

export default class allYourBase extends React.Component {
    render() {
        _st.bodyClass(BODY_CLASS)
        return(
            <div style={{width:'100%',height:'100%',textAlign:'center',backgroundColor:'black'}}>
                <img style={{width:'auto',height:'100%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
            </div>
        )
    }
}