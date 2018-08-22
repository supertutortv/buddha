export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.loading()
    }

    componentDidMount() {
        setTimeout(() => {
            this.visible()
        },3000)
    }

    hidden() {
        this.setState({activeClass : 'loading'})
    }

    visible() {
        this.setState({activeClass : 'active'})
    }

    render() {
        return (
            <div id="stAppMain" className={this.state.activeClass}>Hello world!</div>
        )
    }
}