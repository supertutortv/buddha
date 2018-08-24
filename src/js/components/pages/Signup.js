import React from 'react'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>{JSON.stringyfy(this.props.st.atts)}</div>
        )
    }
}