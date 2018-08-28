import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import * as _st from '../classes/st'

export default class Course extends React.Component {
    render() {
        console.log(this.props)
        return(
            <Switch>
                <Route exact path='/:course/:section' render={d => <div>{d.match.params.section}</div>} />
                <Route exact path='/:course' render={d => <div>Course Component</div>} />
            </Switch>
        )
    }
}