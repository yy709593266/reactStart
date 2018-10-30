import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ContactsApp from './ContactsApp'

class ContactsAppContainer extends Component {
  constructor(){
    super()
    this.state = {
      contacts: []
    }
  }
  componentDidMount(){
    fetch('../static/contacts.json')
      .then(res=>res.json())
      .then(resData => this.setState({contacts: resData}))
      .catch(err=>console.log('error fetching and parsing data'))
  }
  render(){
    return (
      <ContactsApp contacts={this.state.contacts} />
    )
  }
}

ReactDOM.render(<ContactsAppContainer />, document.getElementById('root'))

