import React from "react";
import "./index.scss";

import { connect } from "react-redux";

let mapActionsToProps = (dispatch) => {
  return {
    addTodo: (value) => dispatch({
      type: "ADD_TODO",
      payload: {
        value,
        isCompleted: false,
      }
    })
  }
}

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }

  handleInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  addTodoWithClear = () => {
    this.props.addTodo(this.state.value);
    this.setState({
      value: ""
    });
  }

  render () {
    return (
      <div className="add">
        <input type="text" className="add-input" value={this.state.value} onChange={this.handleInput}/>
        <div className="add-btn" onClick={this.addTodoWithClear}>Add</div>
      </div>
    );
  }
}


export default connect(
  null,
  mapActionsToProps
)(AddTodo);