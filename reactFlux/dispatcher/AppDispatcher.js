import {Dispatcher} from 'flux'
import ListStore from '../stores/ListStore'

// dispatcher 作用是将action派发到store
let AppDispatcher = new Dispatcher()

AppDispatcher.register((action)=>{
  switch (action.actionType) {
    case 'ADD_NEW_ITEM':
      ListStore.addNewItemHandle(action.text)
      ListStore.emitChange()
      break
    default:
      break
  }
})

module.exports = AppDispatcher