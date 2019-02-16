import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import Header from './components/Header'
import MU from './components/MU'
import ResetPassword from './components/ResetPassword'
import STSecured from './components/STSecured'

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