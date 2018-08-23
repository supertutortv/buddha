import React, {Component} from 'react'
import {Route} from 'react-router-dom'

const STRoute = ({component, ...props}) => {
    <Route {...props} render={rtProps => {
        <component {...rtProps} {...props}/>
    }} />
}

export default STRoute