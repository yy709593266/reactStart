/* 
BoardContainer.js用来获取数据传给下层组件
*/
import React, {Component} from 'react'
import Board from './Board'
import update from 'react-addons-update'
import {throttle} from '../utils'

import {Container} from 'flux/utils'
import CardActionCreators from '../actions/CardActionCreators'
import CardStore from '../stores/CardStore'

/*// const API_URL = 'http://kanbanapi.pro-react.com'//后端接口地址
 const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
} */

class BoardContainer extends Component {
  constructor(){
    super(...arguments)
  }
  componentDidMount(){
    //获取数据
    CardActionCreators.fetchCards()
    /* fetch('../mock/cardsList.json', {headers: API_HEADERS})
    .then(res=>res.json())
    .then(resData=>this.setState({cards: resData}))
    .catch(err=>console.log('Error fetching and parsing data', err)) */
  }
  //添加卡片
  addCard(card){
    let prevState = this.state
    if(card.id===null){
      let card = Object.assign({}, card, {id: Date.now()})
    }
    let nextState = update(this.state.cards, {$push: [card]})
    this.setState({cards: nextState})
    //调用添加接口
    /* fetch(`${API_URL}/cards`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then(res=>{
      if(res.ok){
        return res.json()
      }else {
        throw new Error('Server response was not OK')
      }
    })
    .then(resData=>{
      card.id = resData.id
      this.setState({cards: nextState})
    })
    .catch(err=>{
      this.setState(prevState)
    }) */
  }
  //更新卡片信息
  updateCard(card){
    let prevState = this.state
    let cardIndex = this.state.cards.findIndex(c=>c.id===card.id)
    let nextState = update(this.state.cards, {[cardIndex]: {$set: card}})
    this.setState({cards: nextState})
    //调用接口修改
    /* fetch(`${API_URL}/cards/${card.id}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then(res=>{
      if(!res.ok){
        throw new Error('Server response was not OK')
      }
    })
    .catch(err=>{
      console.log('Fetch error: ', err)
      this.setState(prevState)
    }) */
  }
  //这里更新数据都是先UI更新,然后再发起请求保存到服务器(用户体验很好,不用等待结果)
  //但是如果服务器保存错误,就需要用到备份的state的值
  //添加任务
  addTask(cardId, taskName){
    //添加一个任务:会生成一个临时的id,直到这个任务被保存到服务器上,然后服务器会返回这个任务的最终id,然后本地更新这个任务的id
    //临时id可以使用当前时间戳这样的值
    let prevState = this.state
    let cardIndex = this.state.cards.findIndex(function(card){return card.id===cardId})
    let newTask = {id: Date.now(), name: taskName, done: false}
    let nextState = update(this.state.cards, {[cardIndex]: {tasks: {$push: [newTask]}}})
    this.setState({cards: nextState})
    //调用添加接口
    /* fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then(res=>{
      if(res.ok){
        return res.json()
      }else {
        throw new Error('Server response was not OK')
      }
    })
    .then(resData=>{
      newTask.id = resData.id
      this.setState({cards: nextState})
    })
    .catch(err=>{
      console.log('Fetch error: ', err)
      this.setState(prevState)
    }) */
  }
  //删除任务
  deleteTask(cardId, taskId, taskIndex){
    let prevState = this.state
    //findIndex方法使用箭头函数就返回-1,不知道什么原因???
    let cardIndex = this.state.cards.findIndex(function(card){return card.id===cardId})
    let nextState = update(this.state.cards, {[cardIndex]: {tasks: {$splice: [[taskIndex, 1]]}}})
    this.setState({cards: nextState})
    //调删除接口
    /* fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    }).then(res=>{
      if(!res.ok){
        throw new Error('Server response was not OK')
      }
    })
    .catch(err=>{
      console.log('Fetch error: ', err)
      this.setState(prevState)
    }) */
  }
  //勾选和取消勾选
  toggleTask(cardId, taskId, taskIndex){
    let prevState = this.state
    let cardIndex = this.state.cards.findIndex(function(card){return card.id===cardId})
    let newDoneValue
    let nextState = update(this.state.cards, {[cardIndex]: {tasks: {[taskIndex]: {done: {$apply: (done)=>{
      newDoneValue = !done
      return newDoneValue
    }}}}}})
    this.setState({cards: nextState})
    //调用更新接口
    /* fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    })
    .then(res=>{
      if(!res.ok){
        throw new Error('Server response was not OK')
      }
    })
    .catch(err=>{
      console.log('Fetch error: ', err)
      this.setState(prevState)
    }) */
  }
  render(){
    return (<Board 
      routeParams={this.props} 
      cards={this.state.cards} 
      taskCallbacks={{
        toggle: this.toggleTask.bind(this),
        delete: this.deleteTask.bind(this),
        add: this.addTask.bind(this)
      }} 
      cardCallbacks={{
        addCard: this.addCard.bind(this),
        updateCard: this.updateCard.bind(this)
      }}/>)
  }
}

BoardContainer.getStore = ()=>([CardStore])
BoardContainer.calculateState = (prevState)=>({cards: CardStore.getState()})

export default Container.create(BoardContainer)