import React from 'react'

const STStrippedWrapper = ({error,children}) => {
    return (
        <section id="stStripped" className="row">
            <div id="stStrippedInset" className="col s12 m8 l6 offset-m2 offset-l3">
                <div id="stStrippedSpacer" className="row z-depth-2">
                    <header className="stBordered row">
                        <div id="stStrippedInsetDarkHeader" className="col s12">
                            <img src="/assets/img/sttv_logo_contrast.png" />
                        </div>
                    </header>
                    {children}
                    <div id="stFormErrors" className="row">{error.message}</div>
                    <footer className="row">
                        <img src="/assets/img/supertutortv-students.png" />
                    </footer>
                </div>
            </div>
        </section>
    )
}

export default STStrippedWrapper