import {Dispatcher} from 'flux'

class AppDispatcher extends Dispatcher{
  dispatchAsync(promise, types, payload){
    const {request, success, failure} = types
    this.dispatch({type: request, payload: Object.assign({}, payload)})
    promise.then(
      res=>this.dispatch({
        type: success,
        payload: Object.assign({}, payload, {res})
      }),
      err=>this.dispatch({
        type: failure,
        payload: Object.assign({}, payload, {err})
      })
    )
  }
}

export default new AppDispatcher