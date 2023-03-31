import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

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
		login: (
			state,
			action: PayloadAction<{
				userType: "client" | "clinic";
				user: UserObject | ClinicUserObject;
			}>
		) => {
			state.loggedIn = true;
			state.userType = action.payload.userType;
			state.user = action.payload.user;
			secureLocalStorage.setItem(
				"email",
				action.payload.user?.email || "error"
			);
			secureLocalStorage.setItem(
				"userType",
				action.payload.userType || "error"
			);
		},
		logout: (state) => {
			state.loggedIn = false;
			state.userType = initialState.userType;
			state.user = undefined;
			secureLocalStorage.removeItem("email");
			secureLocalStorage.removeItem("userType");
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
