"use client";
import useActions from "@/store/actions";
import * as React from "react";
import ComplianceDialogs from "./compliance-dialogs";
import SuccessDialog from "./success-dialog";


export default function Dialogs() {
	const { ui } = useActions();

	React.useEffect(() => {
		return () => {
			ui.resetDialog();
		};
	}, []);
	return (
		<React.Fragment>
			<ComplianceDialogs />
			<SuccessDialog />
		</React.Fragment>
	);
}
