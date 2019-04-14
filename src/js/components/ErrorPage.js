import React from 'react'
import FAIco from './FAIco'

const ErrorPage = ({error}) => {
	_st.bodyClass = 'errorpage'
	return (
		<st-errorpage>
			<st-fragment>
				<st-frownyface>
					<FAIco icon={["far","frown-open"]}/>
				</st-frownyface>
				<h1>Oops</h1>
				<h6>{error || null}</h6>
			</st-fragment>
		</st-errorpage>
	)
}

export default ErrorPage