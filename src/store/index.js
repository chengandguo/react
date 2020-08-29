import { createStore, applyMiddleware} from "redux";
import reducer from "./reducers/index.js";

//存储相关
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
// 
// middlewares
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import { helloSaga } from "./sagas/index.js";

// const sagaMiddleware = createSagaMiddleware();


const storageConfig = {
  key: "redux",
  storage,
  blacklist: [],   // 配置哪些字段不需要存到localStorage中
  // whitelist: [],
};

const myPersistReducer = persistReducer(storageConfig, reducer);

const store = createStore(
  myPersistReducer,
  applyMiddleware(thunk),
  // applyMiddleware(sagaMiddleware),
  // applyMiddleware(sagaMiddleware, logger),
);

// sagaMiddleware.run(helloSaga);


export const persistor = persistStore(store);
export default store;

