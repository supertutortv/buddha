import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ST from './components/ST'

ReactDOM.render(
    <BrowserRouter>
        <ST />
    </BrowserRouter>,
    document.getElementById('stApp')
)