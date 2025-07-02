import { useAppDispatch } from "./hooks";
import {
	BackBtnPayload,
	changeBackBtn,
	changePageTitle,
	DialogPayload,
	resetDialog,
} from "./ui.slice";
import { changeDialog } from "./ui.slice";

export default function useActions() {
	const dispatch = useAppDispatch();

	const ui = {
		changeDialog: (dialog: DialogPayload) => dispatch(changeDialog(dialog)),
		changePageTitle: (title: string) => dispatch(changePageTitle(title)),
		changeBackBtn: (backBtn: BackBtnPayload | null) => dispatch(changeBackBtn(backBtn)),
		resetDialog: () => dispatch(resetDialog()),
	};

	return {
		ui,
	};
}
