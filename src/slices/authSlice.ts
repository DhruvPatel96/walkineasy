import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	loggedIn: boolean;
	userType: "client" | "clinic";
	user?: UserObject | ClinicUserObject;
}

export interface UserObject {
	name: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	province: string;
}

export interface ClinicUserObject extends UserObject {
	standardEquipment: string[];
	clinicalEquipment: string[];
	diagnosticEquipment: string[];
	laboratoryEquipment: string[];
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
