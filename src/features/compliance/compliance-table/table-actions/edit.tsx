import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { Edit, Edit2, EyeIcon } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function EditComplianceFlow(props: ViewDetailsProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			id: props.id,
			show: true,
			type: "edit_compliance_flow",
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<Edit className="w-4 h-4" /> Edit
			</button>
		</DropdownMenuItem>
	);
}
