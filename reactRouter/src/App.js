import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, Link} from 'react-router'

import About from './About'
import Repos from './Repos'
import Home from './Home'

class App extends Component {
  render(){
    return (
      <div>hello</div>
    )
  }
}

render(<App />, document.getElementById('root'))