import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Topic from './Topic'

class Topics extends Component {
  render(){
    const match = this.props.match
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
          <li><Link to={`${match.url}/components`}>Components</Link></li>
          <li><Link to={`${match.url}/propsstate`}>Props v. State</Link></li>
        </ul>
        <Route exact path={match.url} render={()=><h3>Choose One! ☝ Again!</h3>}></Route>
        <Route path={`${match.url}/:topicId`} component={Topic}></Route>
      </div>
    )
  }
}

export default Topics