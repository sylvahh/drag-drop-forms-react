"use client"
import useActions from "@/store/actions";
import { BackBtnPayload, DialogPayload } from "@/store/ui.slice";
import * as React from "react";

type UiProps = {
	title: string;
};

export default function useUi(props: Partial<UiProps>) {
	const { ui } = useActions();
	React.useLayoutEffect(() => {
		ui.changePageTitle(props?.title ?? "");
	}, [props.title]);

	const changeBackBtn = (payload: BackBtnPayload | null) => {
		ui.changeBackBtn(payload);
	};

	const changeDialog = (payload: DialogPayload) => {
		ui.changeDialog(payload);
	};

	return {
		changeBackBtn,
		changeDialog,
	};
}
