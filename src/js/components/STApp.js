import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './allYourBase'
import Signup from './Signup'
import Header from './Header'
import MU from './MU'
import ResetPassword from './ResetPassword'
import STSecured from './STSecured'

export default class STApp extends React.Component {

	render() {
		return (
			<React.Fragment>
			<Header />
			<Switch>
				<Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
				<Route exact path='/signup/:plan?' component={Signup} />
				<Route exact path='/mu/:teacher' component={MU} />
				<Route exact path='/password/reset/:key?' component={ResetPassword} />
				<Route exact path='/login' component={STSecured} />
				<Route path='/' render={(p) => <STSecured {...p} />} />
			</Switch>
			</React.Fragment>
		)
	}
}