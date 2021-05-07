import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

//Middleware
const logger = (store) => (next) => (action) => {
	console.log("Dispatching--->", action);
	console.log("State Before--->", store.getState());
	next(action);
	console.log("State After--->", store.getState());
};

export default configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
