let initialState = {
  isLogin: false,
};

export default function (state=initialState, action) {
  switch(action.type) {
    case "login/setIsLogin":
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
}