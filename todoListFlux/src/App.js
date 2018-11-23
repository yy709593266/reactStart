import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from '../router/router.js'

render((
  <Router>
    {renderRoutes(routes)}
  </Router>
), document.getElementById('root'))


