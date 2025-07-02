import { configureStore, Tuple } from "@reduxjs/toolkit";
import uiSlice from "./ui.slice";
import { variables } from "@/constants";

export const store = configureStore({
	reducer: {
		ui: uiSlice,
	},
	devTools: variables.SERVICE_ENV === "development",
	middleware: () => new Tuple(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
