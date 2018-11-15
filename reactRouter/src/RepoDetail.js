import React, {Component} from 'react'

class RepoDetail extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      repository: {}
    }
  }
  fetchData(repo_name){
    //通过名称请求接口获取每个的详情
    /* fetch(`https://api.github.com/repos/pro-react/${repo_name}`)
    .then(res=>res.json())
    .then(resData=>this.setState({repository: resData})) */
    //通过名称筛选出当前数据详情
    let repositories = this.props.location.query.repositories
    let temp = repositories.find(repo=>repo.name===repo_name)
    this.setState({repository: temp})
  }
  componentDidMount(){
    let repo_name = this.props.match.params.repo_name
    this.fetchData(repo_name)
  }
  componentWillReceiveProps(nextProps){
    let repo_name = nextProps.match.params.repo_name
    this.fetchData(repo_name)
  }
  render(){
    let stars = []
    for(let i = 0; i < this.state.repository.stargazers_count; i++){
      stars.push('★')
    }
    return (
      <div>
        <h2>{this.state.repository.name}</h2>
        <p>{this.state.repository.description}</p>
        <span>{stars}</span>
      </div>
    )
  }
}

export default RepoDetail