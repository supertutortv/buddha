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
    console.log(e.name)
}

export function submit(e) {
    e.preventDefault()
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