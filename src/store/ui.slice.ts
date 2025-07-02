import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogType =
	""
	| "edit_compliance_flow"
	| "delete_compliance_flow"
	| "view_compliance_flow"
	| "new_compliance_flow"
	| "success";

export type DialogPayload = {
	id?: string;
	show: boolean;
	type: DialogType;
	path?: string;
	data?: Record<string, any> | null;
	action?: ((payload?: any) => Promise<void> | void) | null;
	dismiss?: (() => void) | null;
};

export type BackBtnPayload = {
	show: boolean;
	text?: string;
	action?: () => void;
	path_match?: string;
	icon?: string;
	className?: string;
};

type UiState = {
	dialog: DialogPayload;
	pageTitle: string;
	backBtn: BackBtnPayload | null;
};

const initialState: UiState = {
	dialog: {
		id: "",
		show: false,
		type: "",
		path: "",
		action: null,
		data: null,
		dismiss: null,
	},
	pageTitle: "",
	backBtn: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		changeDialog: (state, action: PayloadAction<Partial<DialogPayload>>) => {
			return {
				...state,
				dialog: { ...state.dialog, ...action.payload },
			};
		},
		changePageTitle: (state, action: PayloadAction<string>) => {
			return {
				...state,
				pageTitle: action.payload,
			};
		},
		changeBackBtn: (state, action: PayloadAction<BackBtnPayload | null>) => {
			return {
				...state,
				backBtn: action.payload,
			};
		},

		resetDialog: (state) => {
			return {
				...state,
				dialog: initialState.dialog,
			};
		},
	},
});

export const { changeDialog, changePageTitle, changeBackBtn, resetDialog } = uiSlice.actions;
export default uiSlice.reducer;
