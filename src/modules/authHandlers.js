// Server unsets the auth cookie and returns a redirect
function logout() {
  fetch('https://api.supertutortv.com/v2/auth/logout', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    }).then(response => this.handleResponse(response))
    .then(items => {
      localStorage.removeItem('sttv_data')
      window.location.replace(items.redirect)
    })
}

// Verify an issued cookie; bump user to login if their cookie is bad, otherwise
// get data from localstorage if it exists or from the API if not;
function verifySession() {
  fetch('https://api.supertutortv.com/v2/auth/token/verify', {
  method: 'POST',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    }
  })
  .then(response => this.handleResponse(response))
  .then(items => {
    if (items.data == true) {
      this.setState({auth: true})
      this.getData()
    }
    else {
      localStorage.removeItem('sttv_data')
      setTimeout(() => {
        window.location.replace('http://localhost:8888/sttvroot/login')
      },250)
    }
  })
  .catch(error => {
    void(0)
  })
}

export {logout, verifySession}
