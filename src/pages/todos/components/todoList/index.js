import React from "react";
import "./index.scss";
import cx from "classnames";
import { connect} from "react-redux";


let mapStateToProps = state => {
  return {
    list: state.list,
    visibility: state.visibility,
  }
}

let mapActionsToProps = dispatch => ({
  switchStoreTodo: list => dispatch({
    type: "SWITCH_TODO",
    payload: list,
  }),
});

class TodoList extends React.Component {
  switchCompleted = id => {
    let newList = this.props.list.map(item => {
      if(item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        }
      } else {
        return {
          ...item,
        };
      }
    });
    
    this.props.switchStoreTodo(newList);
  }

  render () {
    let newList = this.props.list.filter(item => {
      switch (this.props.visibility) {
        case "completed":
          return item.isCompleted;
        
        case "uncompleted":
          return !item.isCompleted;
        default:
          return item;
      }
    });
    return (
      newList.length === 0 ?
      <div className="todo-list-empty">empty</div>:
      <ul className="todo-list">
        {newList.map((item, index) => 
          (<li className={cx("todo-item", {"todo-item-completed": item.isCompleted})}
            key={index}
            onClick={() => this.switchCompleted(item.id)}>{item && item.value}</li>))}
      </ul>
    );
  }
}


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(TodoList);

/*


*/