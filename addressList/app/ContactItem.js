import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ContactItem extends Component {
  render(){
    return (<li>{this.props.name} --- {this.props.email}</li>)
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ContactItem