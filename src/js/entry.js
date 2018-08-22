import React from 'react'
import ReactDOM from 'react-dom'
import {TransitionGroup, CSSTransition} from "react-transition-group"
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"
import ST from './components/ST'

const stApp = document.getElementById("stApp")

ReactDOM.render(<ST />,stApp)