import React, {Component} from 'react'
import ReactDOM from 'react-dom'

/* //demo1
class Hello extends Component {
  render(){
    let place = 'World'
    return (
      <h1>Hello {place}</h1>
    )
  }
}
ReactDOM.render(<Hello />, document.getElementById('root')) */

/* //demo2
//父组件
class GroceryList extends Component {
  render () {
    return (
      <ul>
        <ListItem quantity="1" name="Bread" />
        <ListItem quantity="6" name="Eggs" />
        <ListItem quantity="2" name="Milk" />
      </ul>
    )
  }
}
//子组件
class ListItem extends Component {
  render () {
    return (
      <li>
        {this.props.quantity} x {this.props.name}
      </li>
    )
  }
}
ReactDOM.render(<GroceryList />, document.getElementById('root')) */

//demo3
//父组件
class Counter extends Component {
  constructor(){
    super()
    this.state = {count: 0}
  }
  render(){
    return(
      <div>
        <input type="button" value="-" onClick={this.handleCountDecrease.bind(this)} />
        <input type="text" value={this.state.count} onChange={this.handleInputValueChange.bind(this)} />
        <input type="button" value="+" onClick={this.handleCountIncrease.bind(this)} />
      </div>
    )
  }
  handleInputValueChange(ev){
    this.setState({count: ev.target.value})
  }
  handleCountDecrease(){
    let curCount = Number(this.state.count) - 1
    this.setState({count: curCount})
  }
  handleCountIncrease(){
    let curCount = Number(this.state.count) + 1
    this.setState({count: curCount})
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'))
