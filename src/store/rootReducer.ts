import { combineReducers } from "redux";
import taskReducer from "../taskReducer";
import darkModeReducer from "../darkModeReducer";
import authReducer from "../authReducer";

const rootReducer = combineReducers({
  taskState: taskReducer,
  darkModeState: darkModeReducer,
  userState: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
