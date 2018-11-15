import React, {Component} from 'react'

class Topic extends Component {
  render(){
    let match = this.props.match
    return (
      <div>{match.params.topicId}</div>
    )
  }
}

export default Topic