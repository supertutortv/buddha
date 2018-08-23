import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ST from './components/ST'

const STTV = class {
    constructor() {
        this.hello = 'Hello World'
    }
}

module.exports = new STTV

ReactDOM.render(
    <BrowserRouter>
        <ST />
    </BrowserRouter>,
    document.getElementById('stApp')
)