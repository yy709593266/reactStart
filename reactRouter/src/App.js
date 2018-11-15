import React, {Component} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

import About from './About'
import Topics from './Topics'
import Repos from './Repos'
import ServerError from './ServerError'

class App extends Component {
  render(){
    return(
      <Router history={history}>
        <div>
          <ul>
            <li><Link to="/repos">Repos</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>
          <hr />
          {/* exact用来严格匹配,否则Choose One页会一直出现 */}
          <Route exact path="/" render={()=><h3>Choose One! ☝</h3>} />
          <Route path="/repos" component={Repos} />
          <Route path="/about" title="About Us" component={About} />
          <Route path="/topics" component={Topics} />
          <Route path="/error" component={ServerError} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))