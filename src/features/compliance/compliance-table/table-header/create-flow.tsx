import { Plus } from "lucide-react";
import * as React from "react";
import { HeaderProps } from ".";
import AppButton from "@/components/app/app-button";
import useActions from "@/store/actions";

export default React.memo(function AddComplianceFlow(props: HeaderProps) {
	const { ui } = useActions();
	const handleAddCustomer = () => {
		ui.changeDialog({
			show: true,
			type: "new_compliance_flow",
		});
	};
	return (
		<AppButton
			variant="black"
			className="flex items-center"
			onClick={handleAddCustomer}
			disabled={props.disabled}
			leftIcon={<Plus className="w-5 h-5" />}
		>
			Add Compliance Flow
		</AppButton>
	);
});
