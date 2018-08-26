import React from 'react'
import * as _st from '../classes/st'

export default class allYourBase extends React.Component {
    componentWillUnmount() {
        _st.bodyClass('allYourBase')
    }
    componentDidMount() {
        _st.bodyClass('allYourBase')
    }
    render() {
        return(
            <div style={{width:'100%',height:'100%',textAlign:'center',backgroundColor:'black'}}>
                <img style={{width:'auto',height:'100%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
            </div>
        )
    }
}