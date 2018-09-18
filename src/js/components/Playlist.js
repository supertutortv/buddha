import React from 'react'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA"></div>
                    <div className="stPlaylistColB">{JSON.stringify(this.props.obj)}</div>
                </div>
            </section>
        )
    }
}