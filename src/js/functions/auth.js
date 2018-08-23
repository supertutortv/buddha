export function verifySession() {
    fetch('https://api.supertutortv.com/v2/auth/verify', {
        method: 'POST',
        accept: 'application/vnd.sttv.app+json',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(d => {
        this.setState({
            auth : d.data,
            loading : false
        })
        this.loading()
    })
}