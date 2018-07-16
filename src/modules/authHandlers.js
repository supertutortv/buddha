// Server unsets the auth cookie and returns an object with a redirection url
function logout() {
  fetch('https://api.supertutortv.com/v2/auth/logout', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'X-RateLimit-Buster': 'C0ED0C923C20304CAE65E56E0DB9BBB20D14ADA67D6B478E64F500D0A3C4A2E0',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    }).then(response => this.handleResponse(response))
    .then(items => {
      localStorage.removeItem('sttv_data')
      window.location.replace(items.redirect)
    })
}

// Get a token for a user on login; clears localStorage and fetches a new
// course object
function getToken() {
  fetch('https://api.supertutortv.com/v2/auth/token', {
  method: 'POST',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'X-RateLimit-Buster': 'C0ED0C923C20304CAE65E56E0DB9BBB20D14ADA67D6B478E64F500D0A3C4A2E0',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: this.state.username,
    password: this.state.password,
    })
  })
  .then( response => this.handleResponse(response))
  .then( items => {
    if (items !== null) {
      if (items.code == 'login_success') {
        //this.setState({auth: true, username: '', password : '', message: ''})
        localStorage.removeItem('sttv_data')
        window.location.reload()
        //this.getData()
      }
      else {
        this.setState({
          message: 'Incorrect username or password',
          auth: false,
        })
      }
    }
  })
  .catch(error => {
    this.setState({
      message: 'Unable to log you in. Please check your network connection and try again.'
    })
  })
}

// Verify an issued token; get data from localstorage if it exists or from
// the API if not
function verifyToken() {
  fetch('https://api.supertutortv.com/v2/auth/token/verify', {
  method: 'POST',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'X-RateLimit-Buster': 'C0ED0C923C20304CAE65E56E0DB9BBB20D14ADA67D6B478E64F500D0A3C4A2E0',
    'Content-Type': 'application/json',
    }
  })
  .then( response => this.handleResponse(response))
  .then( items => {
    if (items.data == true) {
      this.setState({auth: true})
      this.getData()
    }
    else {
      setTimeout(()=>{
        window.location.replace('http://localhost:8888/sttvroot/login')
      },250)
    }
  })
  .catch(error => {
    this.setState({
      auth: false,
      message: 'Unable to authenticate your session. Please check your network connection and try again.'
    })
  })
}

export {getToken, logout, verifyToken}
