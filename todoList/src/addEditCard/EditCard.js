import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CardForm from './CardForm'
import update from 'react-addons-update'

class EditCard extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      card: {}
    }
  }
  componentWillMount(){
    let card = this.props.location.query
    this.setState({card})
  }
  handleChange(field, value){
    let nextState = update(this.state.card, {[field]: {$set: value}})
    this.setState({card: nextState})
  }
  handleSubmit(e){
    e.preventDefault()
    let {cardCallbacks} = this.props.location.query
    cardCallbacks.updateCard(this.state.card)
    this.props.history.push('/')
  }
  handleClose(e){
    this.props.history.push('/')
  }
  render(){
    return (
      <CardForm 
        draftCard={this.state.card}
        buttonLabel="Edit Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    )
  }
}
EditCard.propTypes = {
  cardCallbacks: PropTypes.object
}
export default EditCard