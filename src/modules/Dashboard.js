import React from 'react'
import {Icon} from 'react-materialize'

// Dashboard component. Could use a little styling.
function Dashboard(props) {
  return(
    <div>
      <h3>Welcome to the Dashboard, {this.state.user.userdata.firstname}</h3>
      <div>
        <h2>Settings:</h2>
        <br/>
        <a onClick={() => this.updateUserObj('settings')}><strong>Update Settings </strong><Icon>cloud_upload</Icon></a>
        <div>
          <h2>Your Information:</h2>
          <small>(click to edit)</small>
          <div>
            First Name
            <input type="text" autoComplete="off" className="info-input" name="firstname" value={this.state.user.userdata.firstname} onChange={(event) => this.nestedStateChange(["userdata"], event)}/>
          </div>
          <div>
            Last Name
            <input type="text" autoComplete="off" className="info-input" name="lastname" value={this.state.user.userdata.lastname} onChange={(event) => this.nestedStateChange(["userdata"], event)} />
          </div>
          <div>
            <br/>
            Line 1 <input type="text" autoComplete="off" className="info-input" name="line1" value={this.state.user.userdata.address.line1} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
            <br/>
            Line 2 <input type="text" autoComplete="off" className="info-input" name="line2" value={this.state.user.userdata.address.line2} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
            <br/>
            City <input type="text" autoComplete="off" className="info-input" name="city" value={this.state.user.userdata.address.city} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
            <br/>
            State <input type="text" autoComplete="off" className="info-input" name="state" value={this.state.user.userdata.address.state} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
            <br/>
            Zip <input type="text" autoComplete="off" className="info-input" name="zip" value={this.state.user.userdata.address.zip} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
          <br/>
          <a type="button" onClick={() => this.updateUserObj('userdata')}><strong>Update Information </strong><Icon>cloud_upload</Icon></a>
        </div>
        <div>
          <h2>Your Orders:</h2>
          {this.state.user.userdata.orders}
        </div>
      </div>
    </div>
  )
}

// Handles changes to the user object's state, used in the Dashboard
function nestedStateChange(path, {target}){
  // Recursive function that for updating nested objects
  const helper = function(path, obj, {target}) {
    if (path.length > 0) {
      let key = path.shift()
      obj[key] = helper(path, obj[key], {target})
    }
    else {
      if (target.type == 'checkbox') {
        obj[target.name] = target.checked
      }
      else {
        obj[target.name] = target.value
      }
    }
    return obj
  }
  this.setState({user : helper(path, this.state.user, {target})})
}

export {Dashboard, nestedStateChange}
