import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import RepoDetail from './RepoDetail'

class Repos extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      repositories: []
    }
  }
  componentDidMount(){
    fetch('https://api.github.com/users/pro-react/repos')
    // fetch('../mock/repos.json')
    .then(res=>{
      if(res.ok){
        return res.json()
      }else {
        throw new Error("Server response wasn't OK")
      }
    })
    .then(resData=>{
      this.setState({repositories: resData})
    })
    .catch(err=>{
      this.props.history.push('/error')
    })
  }
  render(){
    let repos = this.state.repositories.map(repo=>{
      let path = {
        pathname: `/repos/details/${repo.name}`,
        query: {repositories: this.state.repositories}
      }
      return <li key={repo.id}><Link to={path}>{repo.name}</Link></li>
    })
    return (
      <div>
        <h1>Github Repos</h1>
        <ul>
          {repos}
        </ul>
        <Route path="/repos/details/:repo_name" component={RepoDetail}></Route>
      </div>
    )
  }
}

export default Repos

