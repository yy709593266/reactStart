//dispatcher作用将action派发到store

import {Dispatcher} from 'flux'
import CardStore from './stores/CardStore'

let AppDispatcher = new Dispatcher()
AppDispatcher.register(action=>{
  switch (action.actionType) {
    case 'ADD_CARD':
      CardStore.addCardHandle(action.card)
      CardStore.emitChange()
      break
    case 'UPDATE_CARD':
      CardStore.updateCardHandle(action.card)
      CardStore.emitChange()
      break
    case 'TASK_TOGGLE':
      CardStore.toggleTaskHandle(action.cardId, action.taskId, action.taskIndex)
      CardStore.emitChange()
      break
    case 'ADD_TASK':
      CardStore.addTaskHandle(action.cardId, action.taskName)
      CardStore.emitChange()
      break
    case 'DELETE_TASK':
      CardStore.deleteTaskHandle(action.cardId, action.taskId, action.taskIndex)
      CardStore.emitChange()
      break
    default:
      break
  }
})

module.exports = AppDispatcher
