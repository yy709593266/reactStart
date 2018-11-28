//action作用说明动作的类型和传递来的数据

import AppDispatcher from '../AppDispatcher'

let CardAction = {
  addCard(card){
    AppDispatcher.dispatch({
      actionType: 'ADD_CARD',
      card: card
    })
  },
  updateCard(card){
    AppDispatcher.dispatch({
      actionType: 'UPDATE_CARD',
      card: card
    })
  }
}

module.exports = CardAction