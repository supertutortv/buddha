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
    let el = e.target
    this.setState((prev) => Object.assign(prev.creds,{[el.name]: el.value}))
}

export function submit(e) {
    e.preventDefault()
    _st.loading = true

    let creds = e.target.getElementsByTagName('input')
    for (var i = 0; i < creds.length; i++) { 
        Object.assign(this.state.creds,{[creds[i].name]: creds[i].value})
    }

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