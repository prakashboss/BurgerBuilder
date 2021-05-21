import React, { Component } from 'react'

const asyncComponent = importedComponent => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount () {
      importedComponent()
        .then((cmp)=>{
          this.setState({component: cmp})
        })
    }
    render() {
      const C = this.state.component
      return <C {...this.props}/>
        
    }
  }
}


export default  asyncComponent