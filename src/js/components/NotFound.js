import React from 'react'
import FAIco from './FAIco'

const NotFound = () => {
	_st.bodyClass = 'notfound'
	return (
		<st-notfound>
			<st-frownyface>
				<FAIco icon={["far","frown-open"]}/>
			</st-frownyface>
			<span>Oops</span>
		</st-notfound>
	)
}

export default NotFound