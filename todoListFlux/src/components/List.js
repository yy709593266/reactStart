import React, {Component} from 'react'
import Card from './Card'
import PropTypes from 'prop-types'

class List extends Component {
  render(){
    let cards = this.props.cards.map((card)=>{
      // 可以使用展开操作符直接展示除了key和taskCallbacks之外的属性:{...card}
      return <Card
                key={card.id} 
                id={card.id} 
                title={card.title} 
                status={card.status}
                description={card.description} 
                color={card.color} 
                tasks={card.tasks} 
                taskCallbacks={this.props.taskCallbacks}
                cardCallbacks={this.props.cardCallbacks}/>
    })
    return (
      <div className='list'>
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

export default List