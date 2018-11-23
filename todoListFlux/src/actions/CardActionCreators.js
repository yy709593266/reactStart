import AppDispatcher from '../AppDispatcher'
import constants from '../constants'
import BoardAPI from '../api/BoardApi'

let CardActionCreators = {
  fetchCards(){
    AppDispatcher.dispatchAsync(BoardAPI, fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      failure: constants.FETCH_CARDS_ERROR
    })
  }
}

export default CardActionCreators