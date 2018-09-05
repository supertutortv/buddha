import React from 'react'
import STStrippedWrapper from './STStrippedWrapper'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

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
            'Plans',
            'Account',
            'Billing',
            'Shipping',
            'Pay',
            'ThankYou'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        _st.bodyClass = 'signup'
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    shouldComponentUpdate() {
        return this.state.update 
    }

    render() {
        console.log('render method')
        const SignupStep = steps[this.steps[this.state.step]]
        return(
            <STStrippedWrapper error={this.state.error}>
                <div id="stSignupWrapper" className="stFormWrapper row">
                    <div className="stOverlay"></div>
                        {(('plan' in this.state.params)&&!this.state.init) ?
                            this.initSession(this.state.params['plan']) :
                            <SignupStep 
                                changeStep={this.changeStep} 
                                createAccount={this.createAccount} 
                                updateInp={this.updateInp} 
                                initSession={this.initSession} 
                            />
                        }
                </div>
                {this.props.history.replace('/signup/'+this.steps[this.state.step].toLowerCase())}
            </STStrippedWrapper>
        )
    }
}