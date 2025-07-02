import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { Trash2 } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function DeleteComplianceFlow(props: ViewDetailsProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			id: props.id,
			show: true,
			type: "delete_compliance_flow",
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<Trash2 className="w-4 h-4 text-error-500" /> Delete
			</button>
		</DropdownMenuItem>
	);
}
