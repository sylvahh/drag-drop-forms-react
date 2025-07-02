import AppButton from "@/components/app/app-button";
import AppDialog from "@/components/app/app-dialog";
import { assets } from "@/constants";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";

import * as React from "react";

export default React.memo(function SuccessDialog() {
	const { dialog } = useAppSelector("ui");
	const { ui } = useActions();
	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "success";
	}, [dialog.show, dialog.type]);

	const close = React.useCallback(() => {
		if (dialog.dismiss) {
			dialog.dismiss();
		}
		ui.resetDialog();
	}, [dialog.dismiss]);

	return (
		<AppDialog
			open={open}
			onClose={close}
			footer={
				<div className="flex justify-between gap-2 w-full">
					<AppButton
						variant={dialog.data?.buttonVariant ?? !dialog.action ? "black" : "muted"}
						onClick={close}
						className="w-full"
					>
						{dialog.data?.buttonText ?? "Dismiss"}
					</AppButton>
					{dialog.action && (
						<AppButton variant={"black"} onClick={dialog.action} className="w-full">
							Proceed
						</AppButton>
					)}
				</div>
			}
		>
			<div className="flex flex-col items-center justify-center gap-5">
				<img src={assets.success_badge_01} alt="success-badge" className="size-14" />
				<div className="text-center">
					<h1 className="font-bold heading-5">{dialog.data?.title ?? "Successful"} </h1>
					<span className="text-center body-2 text-neutral-500">
						{dialog.data?.text ?? "success"}
					</span>
				</div>
			</div>
		</AppDialog>
	);
});
