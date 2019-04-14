import React from 'react'
import FAIco from './FAIco'

const NotFound = () => {
	_st.bodyClass = 'notfound'
	return (
		<st-notfound>
			<st-fragment>
				<st-frownyface>
					<FAIco icon={["far","frown-open"]}/>
				</st-frownyface>
				<h1>Oops</h1>
			</st-fragment>
		</st-notfound>
	)
}

export default NotFound