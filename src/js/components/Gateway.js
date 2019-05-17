import React from 'react'

export default class Gateway extends React.Component {
    state = {
        loggedIn: null
    }

    render() {
        return (
            <h1>{"The logged in state is: "+this.state.loggedIn}</h1>
        )
    }
}