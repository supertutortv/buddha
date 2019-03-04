import React from 'react'

class STModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            typeClass: ''
        }
    }

    componentDidMount() {
        this.setState({typeClass:this.props.type})
    }

    render() {
        let { typeClass } = this.state,
            { children } = this.props
        return (
            <div className={['stModal',typeClass].join(' ')} onClick={(e) => e.target.classList.contains("stModal") && closer()}>
                <div className="stModalInner">
                    {children}
                </div>
            </div>
        )
    }
}

STModal.defaultProps = {
    type: 'default'
}

export default STModal