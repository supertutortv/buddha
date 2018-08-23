import React from 'react'
import ReactDOM from 'react-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            auth : false
        }
    }

    componentDidMount() {
        this.active()
    }

    loading() {
        this.setState({loading : true})
    }

    active() {
        this.setState({loading : false})
    }

    render() {
        return (
            <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                <Header />
                <Sidebar />
                <Main />
            </div>
        )
    }
}