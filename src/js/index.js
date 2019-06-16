import React from 'react'
import ReactDOM from 'react-dom'
import STApp from './components/STApp'

import STTV from './_st'

//console.log(process.env.APP_MODE)

window._st = STTV

ReactDOM.render( 
    <STApp/>,
document.querySelector('st-app') )
// End of line, man.