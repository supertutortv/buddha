import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ST from './components/ST'

export class STTV {
    constructor() {
        this.hello = 'Hello World'
    }
}

const _st = new STTV

ReactDOM.render(
    <BrowserRouter>
        <ST />
    </BrowserRouter>,
    document.getElementById('stApp')
)