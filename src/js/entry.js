import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ST from './components/ST'

const STTV = {
    hello : 'Hello World'
}

ReactDOM.render(
    <BrowserRouter>
        <ST _st={STTV}/>
    </BrowserRouter>,
    document.getElementById('stApp')
)