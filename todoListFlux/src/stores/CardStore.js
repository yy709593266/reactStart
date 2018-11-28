//store作用保存整个应用的状态

let EventEmitter = require('events').EventEmitter
let assign = require('object-assign')
import update from 'react-addons-update'

// const API_URL = 'http://kanbanapi.pro-react.com'//后端接口地址
const API_URL = '../../mock/cardsList.json'
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
}

let CardStore = assign({}, EventEmitter.prototype, {
  cards: [],
  fetchCards: function(){
    return this.cards
    /* return fetch(API_URL, {headers: API_HEADERS})
    .then(res=>res.json())
    .then(resData=>this.cards = resData)
    .catch(err=>console.log('Error fetching and parsing data', err)) */
  },
  //这里更新数据都是先UI更新,然后再发起请求保存到服务器(用户体验很好,不用等待结果)
  //但是如果服务器保存错误,就需要用到备份的state的值
  //添加卡片
  addCardHandle: function(card){
    if(card.id===null){
      card = Object.assign({}, card, {id: Date.now()})
    }
    this.cards.push(card)
    //调用添加接口
    /* let prevState = this.cards
    fetch(`${API_URL}/cards`, {
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
      this.cards.push(card)
    })
    .catch(err=>{
      this.cards = prevState
    }) */
  },
  //更新卡片信息
  updateCardHandle: function (card) {
     let cardIndex = this.cards.findIndex(c=>c.id===card.id)
     this.cards[cardIndex] = card
  },
  //添加任务
  addTaskHandle: function(cardId, taskName){
    //添加一个任务:会生成一个临时的id,直到这个任务被保存到服务器上,然后服务器会返回这个任务的最终id,然后本地更新这个任务的id
    //临时id可以使用当前时间戳这样的值
    let cardIndex = this.cards.findIndex(c=>c.id===cardId)
    let newTask = {id: Date.now(), name: taskName, done: false}
    this.cards[cardIndex].tasks.push(newTask)
  },
  //切换勾选任务
  toggleTaskHandle: function (cardId, taskId, taskIndex) {
    let cardIndex = this.cards.findIndex(c=>c.id===cardId)
    let oldDone = this.cards[cardIndex].tasks[taskIndex].done
    this.cards[cardIndex].tasks[taskIndex].done = !oldDone
  },
  deleteTaskHandle: function(cardId, taskId, taskIndex){
    let cardIndex = this.cards.findIndex(c=>c.id===cardId)
    this.cards[cardIndex].tasks.splice(taskIndex, 1)
  }
})

module.exports = CardStore