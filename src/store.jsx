import { legacy_createStore as createStore } from 'redux';
import rootReducer from "./reducers/index";
// khởi tạo store

const store = createStore(rootReducer);
export default store;