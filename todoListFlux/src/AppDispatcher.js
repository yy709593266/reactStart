//dispatcher作用将action派发到store

import {Dispatcher} from 'flux'
import CardStore from './stores/CardStore'

let AppDispatcher = new Dispatcher()
AppDispatcher.register(action=>{
  switch (action.actionType) {
    case 'ADD_CARD':
      CardStore.addCardHandle(action.card)
      break
    case 'UPDATE_CARD':
      CardStore.updateCardHandle(action.card)
      break
    case 'TASK_TOGGLE':
      CardStore.toggleTaskHandle(action.cardId, action.taskId, action.taskIndex)
      break
      break
    case 'ADD_TASK':
      CardStore.addTaskHandle(action.cardId, action.taskName)
      break
    case 'DELETE_TASK':
      CardStore.deleteTaskHandle(action.cardId, action.taskId, action.taskIndex)
      break
    default:
      break
  }
})

module.exports = AppDispatcher
