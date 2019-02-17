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
					<a class="stControlBarLink">
						<FAIco icon="cloud-download-alt"/>
					</a>
				</div>
				<div>
					<a class="stControlBarLink">
						<FAIco icon="cloud-download-alt"/>
					</a>
				</div>
				<div>
					<a class="stControlBarLink">
						<FAIco icon="cloud-download-alt"/>
					</a>
				</div>
				<div>
					<a class="stControlBarLink">
						<FAIco icon="cloud-download-alt"/>
					</a>
				</div>
				<div>
					<a class="stControlBarLink">
						<FAIco icon="cloud-download-alt"/>
					</a>
				</div>
			</div>
		)
	}
}