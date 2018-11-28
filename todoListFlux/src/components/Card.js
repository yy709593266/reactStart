import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CheckList from './CheckList'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' //react的css动画
import marked from 'marked' //marddown使用
import PropTypes from 'prop-types'

let titlePropType = (props, propName, componentName) => {
  if(props[propName]){
    let value = props[propName]
    if(typeof value !== 'string' || value.length > 10){
      return new Error(`${propName} in ${componentName} is longer than 10 characters.`)
    }
  }
}

class Card extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      showDetails: false
    }
  }
  toggleDetails(){
    this.setState({
      showDetails: !this.state.showDetails
    })
  }
  render(){
    let cardDetails
    if(this.state.showDetails){
      cardDetails = (
        <div className="card_details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}></span>
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}/>
        </div>
      )
    }
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    }
    return (
      <div className="card">
        <div style={sideColor}></div>
        <div className="card_edit">
          <Link to={{
            pathname: `/edit/${this.props.id}`,
            query: this.props
          }}>&#9998;</Link>
        </div>
        <div className={this.state.showDetails?'card_title card_title-is-open':'card_title'} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
        <ReactCSSTransitionGroup
          transitionName="toggle"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

export default Card