import AppDispatcher from '../AppDispatcher'

let TaskAction = {
  toggleTask(cardId, taskId, taskIndex){
    AppDispatcher.dispatch({
      actionType: 'TASK_TOGGLE',
      cardId: cardId,
      taskId: taskId,
      taskIndex: taskIndex
    })
  },
  addTask(cardId, taskName){
    AppDispatcher.dispatch({
      actionType: 'ADD_TASK',
      cardId: cardId,
      taskName: taskName
    })
  },
  deleteTask(cardId, taskId, taskIndex){
    AppDispatcher.dispatch({
      actionType: 'DELETE_TASK',
      cardId: cardId,
      taskId: taskId,
      taskIndex: taskIndex
    })
  }
}

module.exports = TaskAction