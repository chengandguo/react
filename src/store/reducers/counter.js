import { 
  // createAction,
  handleActions,
} from "redux-actions";

let initialState = {
  count: 0,
}

let reducer = handleActions({
  "INCREMENT": (state, action) => ({
    count: state.count + action.payload,
  }),

  "DECREMENT": (state, action) => ({
    count: state.count - action.payload,
  }),
}, initialState, {
  prefix: "COUNTER",
});

export default reducer;
