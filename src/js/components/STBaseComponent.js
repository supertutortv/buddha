import React from 'react'
import ErrorPage from './ErrorPage'

const STBaseComponent = ({children}) => {
	try {
		return children
	} catch (e) {
		return <ErrorPage error={e}/>
	}
}

export default STBaseComponent