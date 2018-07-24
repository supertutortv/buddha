import React from 'react'

// Login component; tries to get a token from the API with the login information
function Login() {
  return(
    <div>
      <div id="sttv_login_form">
      <p className="message"></p>
      <div className="row">
        <div className="input-field s12">
          <input type="text" name="username" minLength="4" value={this.state.username} onChange={this.handleChange}/>
          <label>Username</label>
        </div>
        <div className="input-field s12">
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <label>Password</label>
        </div>
      </div>
      <button className="z-depth-1" id="login-btn" onClick={() => this.getToken()}>Login</button>
      </div>
      {this.state.message}
    </div>
  )
}

export {Login}
