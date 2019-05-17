import React from 'react'

export default class Gateway extends React.Component {
    state = {
        loggedIn: null
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.http.post('/auth/verify',{},(d) => {
                this.setState({
                    loggedIn: d.data
                })
            })
        }

        _st.bodyClass = 'gateway signup'
        _st.loading = false
    }

    logEmIn = () => {
        this.setState({
            loggedIn: true
        })
    }

    render() {
        if (this.state.loggedIn === null) return null
        return (
            <h1>{"The logged in state is: "+this.state.loggedIn}</h1>
        )
    }
}