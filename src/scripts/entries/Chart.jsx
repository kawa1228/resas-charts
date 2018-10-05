import React from 'react'

class Chart extends React.Component {
    constructor(props) {
        super(props)
        console.log('hello')
    }
    render() {
        console.log(this.props.data)
        return <div>{'hello'}</div>
    }
}

export default Chart