import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import STApp from './components/STApp'
import STTV from './_st'

import '../sass/stApp.sass'

console.log(process.env.APP_MODE)

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <STApp />
    </BrowserRouter>,
document.querySelector('st-app') )