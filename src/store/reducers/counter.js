import { 
  createActions,
  handleActions,
} from "redux-actions";

let initialState = {
  count: 0,
}

export const { increment, decrement } = createActions({
  "INCREMENT": amount => amount,
  "DECREMENT": amount => amount,
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


