import React, {Component} from 'react'

class MyButton extends Component {
  render () {
    let items = this.props.items
    let itemHtml = items.map((item, index)=>{
      return <li key={index}>{item}</li>
    })
    return (<div>
      <ul>{itemHtml}</ul>
      <button onClick={this.props.onClick}>New Item</button>
    </div>)
  }
}

export default MyButton