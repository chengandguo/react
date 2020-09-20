import { 
  createActions,
  handleActions,
} from "redux-actions";

let initialState = {
  count: 0,
}

export let { increment, decrement} = createActions({
  INCREMENT: value => value,
  DECREMENT: value => value
});

let reducer = handleActions({
  [increment]: (state, action) => ({
    count: state.count + action.payload,
  }),

  [decrement]: (state, action) => ({
    count: state.count - action.payload,
  }),
}, initialState);

export default reducer;


