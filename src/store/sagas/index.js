import { 
  call,
  put,
  takeLatest
} from "redux-saga/effects";

let getAddressRequest = function () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({
        success: true,
        data: {
          province: "Jiangsu",
          city: "Nanjing",
          district: "Jinlin",
        }
      })
    }, 2000);
  });
};


function* getAddress () {
  let res = yield call(getAddressRequest);
  yield put({
    type: "SET_ADDRESS",
    payload: res.data,
  });
}


export default function* mySaga () {
  yield takeLatest("GET_ADDRESS", getAddress);
}