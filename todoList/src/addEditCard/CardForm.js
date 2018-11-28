import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CardForm extends Component {
  handleChange(field, e){
    this.props.handleChange(field, e.target.value)
  }
  handleClose(e){
    e.preventDefault();
    this.props.handleClose()
  }
  render(){
    return(
      <div>
        <div className="card big">
          <form onSubmit={this.props.handleSubmit.bind(this)}>
            <div className="form-group">
              <input 
                type="text" 
                defaultValue={this.props.draftCard.title}
                onChange={this.handleChange.bind(this, 'title')}
                placeholder="Title"
                required={true}
                autoFocus={true} />
            </div>
            <div className="form-group">
              <textarea
                defaultValue={this.props.draftCard.description}
                onChange={this.handleChange.bind(this, 'description')}
                placeholder="Description"
                required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" defaultValue={this.props.draftCard.status} onChange={this.handleChange.bind(this, 'status')}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <br />
            <label htmlFor="color">Color</label>
            <input 
              id="color"
              defaultValue={this.props.draftCard.color}
              onChange={this.handleChange.bind(this, 'color')}
              type="color" />
            <div className="actions">
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose.bind(this)}></div>
      </div>
    )
  }
}

CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  // 一个特定形式的对象
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default CardForm

