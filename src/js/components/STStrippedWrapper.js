import React from 'react'

const STStrippedWrapper = ({error,children}) => {
    return (
        <section id="stStripped" className="row">
            <div id="stStrippedInset" className="col s12 m6 offset-m3">
                <div id="stStrippedSpacer" className="col s12">
                    <header className="stBordered row">
                        <div id="stStrippedInsetHeader" className="col s12">
                            <img src="/assets/img/sttv_logo.png" />
                        </div>
                    </header>
                    {children}
                    <div id="stFormErrors" className="row">{error.message}</div>
                </div>
            </div>
        </section>
    )
}

export default STStrippedWrapper