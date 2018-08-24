import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ST from './components/ST'
import {globalProps,defaultState} from './utilities/setup'

ReactDOM.render(
    <BrowserRouter>
        <ST {...globalProps} {...defaultState} />
    </BrowserRouter>,
    document.getElementById('stApp')
)