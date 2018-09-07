import React from 'react'
import {StripeProvider} from 'react-stripe-elements'
import Signup from './components/Signup'

const SignupInit = (props) => {
    return (
        <StripeProvider apiKey={_st.stripe}>
            <Signup {...props} />
        </StripeProvider>
    )
}

export default SignupInit