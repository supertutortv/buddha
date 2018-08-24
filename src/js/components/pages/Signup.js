import React from 'react'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>{JSON.stringify(this.props.st.atts)}</div>
        )
    }
}