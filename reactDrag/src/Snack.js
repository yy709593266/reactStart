//dragSource(用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）)
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import constants from './constants';

const snackSpec = {
  //拖放开始时触发的事件
  beginDrag(props){
    return {
      name: props.name
    }
  },
  //拖动结束时触发的事件
  endDrag(props, monitor){
    const dragItem = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if(dropResult){
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`)
    }
  }
  /* //当前可以拖拽时的事件
  canDrag(props, monitor){},
  //拖拽时触发的事件
  isDragging(props, monitor){} */
}

let collect = (connect, monitor)=>{
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Snack extends Component {
  render(){
    const {name, isDragging, connectDragSource} = this.props
    const opacity = isDragging ? 0.4 : 1
    const style = {
      opacity: opacity
    }
    return connectDragSource(
      <div className="snack" style={style}>
        {name}
      </div>
    )
  }
}

Snack.propTypes = {
  name: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

export default DragSource(constants.SNACK, snackSpec, collect)(Snack)