import AppDispatcher from '../dispatcher/AppDispatcher'

// 每个action都是一个对象,包含一个actionType和一些其他属性,说明动作的类型和用来传递的数据
let ButtonActions = {
  addNewItem (text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      text: text
    })
  }
}

module.exports = ButtonActions