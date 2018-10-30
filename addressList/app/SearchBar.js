import React, {Component} from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  handleChange(ev){
    this.props.onUserInput(ev.target.value)
  }
  render(){
    return (
      <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange.bind(this)} />
    )
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
}

export default SearchBar