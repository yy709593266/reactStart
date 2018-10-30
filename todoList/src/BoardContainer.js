/* 
BoardContainer.js用来获取数据传给下层组件
*/
import React, {Component} from 'react'
import Board from './Board'

const API_URL = 'http://kanbanapi.pro-react.com'//后端接口地址
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
}

class BoardContainer extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      cards: []
    }
  }
  componentDidMount(){
    // fetch(API_URL + '/card', {headers: API_HEADERS})
    fetch('http://localhost:8080/mock/cardsList.json', {headers: API_HEADERS})
    .then(res=>res.json())
    .then(resData=>this.setState({cards: resData}))
    .catch(err=>console.log('Error fetching and parsing data', err))
  }
  render(){
    return (<Board cards={this.state.cards} />)
  }
}

export default BoardContainer