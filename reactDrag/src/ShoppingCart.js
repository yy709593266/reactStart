//DropTarget(用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）)
import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import constants from './constants'

//spec对象
const ShoppingCartSpec = {
  //组件放下时触发的事件
  drop() {
    return { name: 'ShoppingCart' }
  }
  /* //组件在dropTarget上方时响应的事件
  hover(){},
  //组件可以被放置时触发的事件
  canDrop(){} */
}
//collect函数
//React DnD中的connector和状态映射为组件的props属性
let collect = (connect, monitor)=>{
  return {
    connectDropTarget: connect.dropTarget(),//对div(DropTarget容器)进行封装
    isOver: monitor.isOver(),//source是否在target上方
    canDrop: monitor.canDrop()//是否能被拖拽
  }
}

class ShoppingCart extends Component {
  render(){
    const { canDrop, isOver, connectDropTarget } = this.props
    //可拖拽并在容器上方,此时需要切换样式
    const isActive = canDrop && isOver
    
    let backgroundColor = '#FFFFFF'
    if (isActive) {
      backgroundColor = '#F7F7BD'
    } else if (canDrop) {
      backgroundColor = '#F7F7F7'
    }
    const style = {
      backgroundColor: backgroundColor
    }
    return connectDropTarget(
      <div className="shopping-cart" style={style}>
        {isActive ? 'Hummmm, snack!' : 'Drag here to order!'}
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

//使用DropTarget导出封装之后的高阶组件(其中type是可被放置到这里的拖拽源,即snack)
export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart)
