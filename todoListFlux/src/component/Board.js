import React, {Component} from 'react'
import List from './List'
import PropTypes from 'prop-types'
import {Router, Route, Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

class Board extends Component {
  render(){
    let {route} = this.props.routeParams
    return (
      <div className="app">
        <Link to={{
          pathname: '/new',
          query: this.props
        }} className="float-button">＋</Link>
        {renderRoutes(route.routes)}
        <List
          id='todo' 
          title="To Do" 
          cards={this.props.cards.filter(card=>card.status==='todo')} 
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}/>
        <List
          id='in-progress' 
          title="In Progress" 
          cards={this.props.cards.filter(card=>card.status==='in-progress')} 
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}/>
        <List 
          id='done' 
          title="Done" 
          cards={this.props.cards.filter(card=>card.status==='done')} 
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}/>
      </div>
    )
  }
}

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

export default Board