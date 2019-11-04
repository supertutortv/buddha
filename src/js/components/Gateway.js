import React from 'react'

const thedate = new Date

const Gateway = ({children, className}) =>
    <>
        <main className={"stGatewayForm "+className}>
            <div className="stGatewayFormInner">{children}</div>
        </main>
        <footer role="contentinfo">
            <mark>© {thedate.getFullYear()} Supertutor Media, Inc.</mark>
            <nav>
                <a target="_blank" href="https://supertutortv.zendesk.com/hc/en-us">Support</a>&nbsp;&bull;&nbsp;
                <a target="_blank" href="https://supertutortv.com/terms-and-conditions">Terms</a>&nbsp;&bull;&nbsp;
                <a target="_blank" href="https://supertutortv.com/privacy-policy">Privacy Policy</a>
            </nav>
        </footer>
    </>

export default Gateway