import React from 'react'
import {Icon} from 'react-materialize'

// Dashboard component. Currently contains user and order information.
function Dashboard(props) {
  return(
    <div>
      <h5>Welcome to the Dashboard, {this.state.user.userdata.firstname}</h5>
      <div>
        <h4>Your Information:</h4>
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
          <div>
            <span>Line 1</span>
            <input type="text" autoComplete="off" className="info-input" name="line1" value={this.state.user.userdata.address.line1} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
          <div>
            <span>Line 2</span>
            <input type="text" autoComplete="off" className="info-input" name="line2" value={this.state.user.userdata.address.line2} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
          <div>
            <span>City</span>
            <input type="text" autoComplete="off" className="info-input" name="city" value={this.state.user.userdata.address.city} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
          <div>
            <span>State</span>
            <input type="text" autoComplete="off" className="info-input" name="state" value={this.state.user.userdata.address.state} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
          <div>
            <span>Zip</span>
            <input type="text" autoComplete="off" className="info-input" name="zip" value={this.state.user.userdata.address.zip} onChange={(event) => this.nestedStateChange(["userdata", "address"], event)} />
          </div>
        </div>
          <a type="button" style={{display:'inline-flex'}} onClick={() => this.updateUserObj('userdata')}><strong>Update Information</strong>&nbsp;<Icon>cloud_upload</Icon></a>
      </div>
      <div>
        <h4>Your Orders:</h4>
        {this.state.user.userdata.orders}
      </div>
    </div>
  )
}

// Handles changes to the user object's state; used in the Dashboard
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
