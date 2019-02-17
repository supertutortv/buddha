import React from 'react'
import FAIco from './FAIco'

export default class Controls extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="stControlBar">
				<div>
					<FAIco icon="cloud-download-alt"/>
				</div>
				<div>
					<FAIco icon="cloud-download-alt"/>
				</div>
				<div>
					<FAIco icon="cloud-download-alt"/>
				</div>
				<div>
					<FAIco icon="cloud-download-alt"/>
				</div>
				<div>
					<FAIco icon="cloud-download-alt"/>
				</div>
			</div>
		)
	}
}