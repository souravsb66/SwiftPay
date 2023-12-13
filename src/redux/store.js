import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import { reducer as subscriptionsReducer } from "./admin/subscriptionsReducer/reducer";
import { reducer as supportReducer } from "./admin/SupportReducer/reducer";
import { reducer as usersReducer } from "./user/usersReducer/reducer";
import { reducer as accountReducer } from "./user/accountReducer/reducer";
import thunk from "redux-thunk";

export const baseURL = process.env.REACT_APP_BASE_URL;
// export const baseURL = "https://swiftpay-server.cyclic.app";

const rootReducer = combineReducers({
  authReducer,
  transactionsReducer,
  subscriptionsReducer,
  supportReducer,
  accountReducer,
  usersReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// Checking
