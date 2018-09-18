import React from 'react'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>{JSON.stringify(this.props.obj)}</div>
        )
    }
}