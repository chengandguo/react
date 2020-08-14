import { 
  createAction,
  handleActions,
} from "redux-actions";

let initialState = {
  count: 0,
}

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
// export let increment = createAction(INCREMENT);
// let reducer = handleAction(
//   INCREMENT,
//   (state, action) => ({
//     count: state.count + action.payload,
//   }),
//   initialState,
// );

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
