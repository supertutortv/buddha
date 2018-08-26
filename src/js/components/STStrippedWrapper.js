import React from 'react'

export default class STStrippedWrapper extends React.Component {
    render() {
        return (
            <section id="stStrippedInner" class="row">
                {this.props.children}
            </section>
        )
    }
}