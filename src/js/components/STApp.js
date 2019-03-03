import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './allYourBase'
import Signup from './Signup'
import Header from './Header'
import Controls from './Controls'
import MU from './MU'
import ResetPassword from './ResetPassword'
import STSecured from './STSecured'

export default class STApp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modal: {
				open: false,
				type: '',
				component: null
			}
		}
	}

	render() {
		let { modal } = this.state
		return (
			<React.Fragment>
				<Controls />
				<div className="stRightPanel">
					<Header />
					<Switch>
						<Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
						<Route exact path='/signup/:plan?' component={Signup} />
						<Route exact path='/mu/:teacher' component={MU} />
						<Route exact path='/password/reset/:key?' component={ResetPassword} />
						<Route exact path='/login' component={STSecured} />
						<Route path='/' render={(p) => <STSecured {...p} />} />
					</Switch>
				</div>
				{modal.open ? <div className={["stModal",modal.type].join(' ')}>this one</div> : null }
			</React.Fragment>
		)
	}
}