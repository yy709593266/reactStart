import React, {Component} from 'react'
import ListStore from '../stores/ListStore'
import ButtonActions from '../actions/ButtonActions'
import MyButton from './MyButton'

// controller 组件只用来保存状态,然后将其转发给子组件
class MyButtonController extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      items: ListStore.getAll()
    }
  }
  componentDidMount () {
    ListStore.addChangeListener(this._onChange.bind(this))
  }
  componentWillUnmount () {
    ListStore.removeChangeListener(this._onChange.bind(this))
  }
  _onChange () {
    this.setState({
      items: ListStore.getAll()
    })
  }
  createNewItem () {
    ButtonActions.addNewItem('New出来的Item')
  }
  render(){
    return <MyButton 
      items={this.state.items}
      onClick={this.createNewItem}/>
  }
}

export default MyButtonController