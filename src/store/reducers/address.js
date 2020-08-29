import { createActions, handleActions } from "redux-actions";

let initialState = {
  province: "",
  city: "",
  district: "",
}

export let { setAddress } = createActions({
  SET_ADDRESS: value => value,
});


export default handleActions({
  [setAddress]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);