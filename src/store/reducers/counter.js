import { 
  // createAction,
  handleActions,
} from "redux-actions";

let initialState = {
  count: 0,
}

let reducer = handleActions({
  [increment]: (state, action) => ({
    count: state.count + action.payload,
  }),

  [decrement]: (state, action) => ({
    count: state.count - action.payload,
  }),
}, initialState);

export default reducer;


