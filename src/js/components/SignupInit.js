import React from 'react'
import {StripeProvider} from 'react-stripe-elements'
import Signup from './Signup'

const SignupInit = (props) => {
    return (
        <StripeProvider apiKey={_st.stripe}>
            <Signup {...props} />
            <script src="https://js.stripe.com/v3/"></script>
        </StripeProvider>
    )
}

export default SignupInit