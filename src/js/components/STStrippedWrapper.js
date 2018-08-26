import React from 'react'

export default class STStrippedWrapper extends React.Component {
    render() {
        return (
            <section id="stStrippedInner" className="row">
                <div id="stStrippedInsetRight" className="col s12 l8 offset-l2 stBordered">
                    <div id="stStrippedInsetRightInner" className="z-depth-4">
                        <header className="stBordered row">
                            <div id="stStrippedInsetDarkHeader" className="col s12">
                                <img src="http://localhost:8888/sttvroot/wp-content/themes/sttvsite/i/sttv_logo_contrast.png" />
                            </div>
                        </header>
                        <header className="stBoxed row">
                            <div id="stStrippedInsetLightHeader" className="col s12">
                                <img src="http://localhost:8888/sttvroot/wp-content/themes/sttvsite/i/sttv_logo_contrast.png" />
                            </div>
                        </header>
                        {this.props.children}
                        <div id="stFormErrors" className="row"></div>
                        <footer className="row">
                            <img src="http://localhost:8888/sttvroot/wp-content/themes/sttvsite/i/supertutortv-students.png" />
                        </footer>
                    </div>
                </div>
            </section>
        )
    }
}