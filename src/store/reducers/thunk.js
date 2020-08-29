import {
  createActions,
  handleActions,
} from "redux-actions";


let initialState = {
  isLogin: false,
  address: {
    province: "",
    city: "",
    district: "",
    detail: "",
  }
};

export let { setLogin, setAddress } = createActions({
  SET_LOGIN: value => value,
  SET_ADDRESS: value => value,
});


let reducer =  handleActions({
  [setLogin]: (state, action) => ({
    ...state,
    isLogin: action.payload,
  }),
}, initialState);


export default reducer;