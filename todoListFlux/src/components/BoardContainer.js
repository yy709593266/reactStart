/* 
BoardContainer.js用来获取数据传给下层组件
*/
import React, {Component} from 'react'
import Board from './Board'
import update from 'react-addons-update'
import CardStore from '../stores/CardStore'
import CardAction from '../actions/CardAction'
import TaskAction from '../actions/TaskAction'


class BoardContainer extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      cards: []
    }
  }
  componentDidMount(){
    CardStore.addChangeListener(this._onChange.bind(this))
  }
  componentWillUnmount () {
    CardStore.removeChangeListener(this._onChange.bind(this))
  }
  //添加卡片
  addCard(card){
    CardAction.addCard(card)
  }
  //更新卡片信息
  updateCard(card){
    CardAction.updateCard(card)
  }
  //添加任务
  addTask(cardId, taskName){
    TaskAction.addTask(cardId, taskName)
  }
  //删除任务
  deleteTask(cardId, taskId, taskIndex){
    TaskAction.deleteTask(cardId, taskId, taskIndex)
  }
  //勾选和取消勾选
  toggleTask(cardId, taskId, taskIndex){
    TaskAction.toggleTask(cardId, taskId, taskIndex)
  }
  _onChange(){
    this.setState({
      cards: CardStore.fetchCards()
    })
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

export default BoardContainer