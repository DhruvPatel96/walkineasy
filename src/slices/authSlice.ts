import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	loggedIn: boolean;
	userType: "client" | "clinic";
	//   user: User;
}

const initialState: AuthState = {
	loggedIn: false,
	userType: "client",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<"client" | "clinic">) => {
			state.loggedIn = true;
			state.userType = action.payload;
		},
		logout: (state) => {
			state.loggedIn = false;
			state.userType = initialState.userType;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
