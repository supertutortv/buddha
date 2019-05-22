import React from 'react'

const thedate = new Date

const Gateway = ({children, className}) =>
    <React.Fragment>
        <main className={"stGatewayForm "+className}>
            <div className="stGatewayFormInner">{children}</div>
        </main>
        <footer role="contentinfo">
            <mark>© {thedate.getFullYear()} Supertutor Media, Inc.</mark>
            <nav>Some links</nav>
        </footer>
    </React.Fragment>

export default Gateway