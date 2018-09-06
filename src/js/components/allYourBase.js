import React from 'react'

export default class allYourBase extends React.Component {
    componentDidMount() {
        _st.bodyClass = 'allYourBase'
        _st.loading = false
    }
    render() {
        return(
            <div style={{width:'100%',height:'100%',textAlign:'center',backgroundColor:'black'}}>
                <img style={{width:'auto',height:'100%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
            </div>
        )
    }
}
