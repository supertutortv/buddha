export function verify(cb) {
    fetch('https://api.supertutortv.com/v2/auth/verify', {
        method: 'POST',
        accept: 'application/vnd.sttv.app+json',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(d => {
        typeof cb === 'function' && cb(d)
    })
}

export function token(cb) {
    fetch('https://api.supertutortv.com/v2/auth/token', {
        method: 'POST',
        accept: 'application/vnd.sttv.app+json',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(d => {
        typeof cb === 'function' && cb(d)
    })
}