import React from "react";
import "./index.scss";
import AddTodo from "./components/addTodo/index.js";
import TodoList from "./components/todoList/index.js";
import VisibilityFilters from "./components/visibilityFilters/index.js";
import store from "./store/index.js";
import { Provider } from "react-redux";

class Todos extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className="todos">
          <h1>Here is todo list</h1>
          <AddTodo/>
          <TodoList/>
          <VisibilityFilters/>
        </div>
      </Provider>
    );
  }
}

export default Todos;
