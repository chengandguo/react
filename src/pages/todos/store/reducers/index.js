let initialState = {
  list: [],
  visibility: "all",  
};
let id = 0;
export default function (state=initialState, action) {
  switch(action.type) {
    case "ADD_TODO":
      return {
        ...state,
        list: [...state.list, {...action.payload, id: id++}]
      };
    
    case "SWITCH_TODO":
      return {
        ...state,
        list: action.payload,
      };

    case "SWITCH_VISIBILITY":
      return {
        ...state,
        visibility: action.payload,
      };
    default:
      return state;
  }
}

/*
  list
  {
    text: "redux",
    isCompleted: false,
    id: 0,
  }

*/