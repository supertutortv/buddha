import React from 'react'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        _st.bodyClass = 'playlist'
    }

    render() {
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistColA"></div>
                <div className="stPlaylistColB">{JSON.stringify(this.props.obj)}</div>
            </section>
        )
    }
}