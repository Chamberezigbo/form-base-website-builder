import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	// Add your reducers here
	user: userReducer,
});

export default rootReducer;
