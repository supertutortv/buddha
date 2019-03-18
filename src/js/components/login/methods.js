export function lostPwGo(e) {
    e.preventDefault()
    let prevState = {}
    this.setState((prev) => {
        prevState = prev
        return {
            init: 'pwd',
            error: {
                id: '',
                message: ''
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

    let creds = e.target.closest('form').getElementsByTagName('input')
    for (var i = 0; i < creds.length; i++) { 
        Object.assign(this.state.creds,{[creds[i].name]: creds[i].value})
    }

    _st.http.post('/auth/token',this.state.creds,(d) => {
        switch (d.code) {
            case 'loginFail':
                return this.setState({
                    error: {
                        id: d.code,
                        message: d.message
                    }
                }, () => _st.loading = false)
            case 'loginSuccess':
                return this.props.setLoggedIn()
        }
    })
}

export function sendReset(e) {
    e.preventDefault()

    this.state.error = {
        id: '',
        message: ''
    }
    var formData = e.target.querySelectorAll('input'),
        obj = this.state.reset ? {key: this.state.key} : {},
        method = this.state.reset ? 'put' : 'post'

    for(let el of formData) {
        obj[el.name] = el.value
    }
    
    _st.http[method]('/auth/reset',obj,(d) => {
        if (d.code === 'resetError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        this.setState({
            sent: true,
            sentMsg: d.message
        })
    })
}

export function passMatch() {
    let p1 = document.getElementById('password1'),
        p2 = document.getElementById('password2')
    p2.classList.remove('invalid')

    if (p2.value !== p1.value) return this.setState({
        error: {
            id: 'passNoMatch',
            message: 'The passwords do not match'
        }
    }, () => p2.classList.add('invalid'))
}