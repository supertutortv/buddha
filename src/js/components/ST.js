import React from 'react'
import ReactDOM from 'react-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.visible()
        },5000)
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
            </div>
        )
    }
}