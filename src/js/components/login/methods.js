export function lostPwGo() {
    _st.loading = true
    var prevState = {}
    this.setState((prev) => {
        prevState = prev
        return {
            lostPw : true,
            error : {
                id : '',
                message : ''
            }
        }
    }, () => this.props.history.push({
        pathname: '/password/reset',
        state: prevState
    }))
}

export function setLoginState(e) {
    _st.form.setState(this.state.creds,e.target)
}

export function submit(e) {
    e.preventDefault()
    return console.log(this.state.creds)
    _st.loading = true
    _st.auth.submit('/auth/token',this.state.creds,(d) => {
        switch (d.code) {
            case 'loginFail':
                return this.setState({
                    error: {
                        id: d.code,
                        message: d.message
                    }
                })
            case 'loginSuccess':
                return this.props.setLoggedIn()
        }
    })
}