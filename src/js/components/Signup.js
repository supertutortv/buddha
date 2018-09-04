import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import STStrippedWrapper from './STStrippedWrapper'
import * as methods from './signup/methods'
import { Plans, Account, Billing, Shipping, Pay, ThankYou } from './signup/steps'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            update: true,
            loading: true,
            init: false,
            step: 0,
            params: props.location.search ? _st.objectifyURLParams(props.location.search) : {},
            error : {
                id : '',
                message : ''
            }
        }
        this.steps = [
            Plans,
            Account,
            Billing,
            Shipping,
            Pay,
            ThankYou
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentDidMount() {
        _st.bodyClass = 'signup'
        _st.loading = false
    }

    shouldComponentUpdate() {
        return this.state.update 
    }

    render() {
        const SignupStep = this.steps[this.state.step]
        return(
            <STStrippedWrapper error={this.state.error}>
                <div id="stSignupWrapper" className="stFormWrapper row">
                    <div className="stOverlay"></div>
                        {(('plan' in this.state.params)&&!this.state.init) ?
                            this.initSession(this.state.params['plan']) :
                            <SignupStep {...this} />
                        }
                </div>
            </STStrippedWrapper>
        )
    }
}