import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCustomNavigation from "@/hooks/use-navigation";
import { EyeIcon } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function ViewDetails(props: ViewDetailsProps) {
	const { navigate } = useCustomNavigation();

	const toggleShow = () => {
		navigate(`/flows/${props.id}`);
		// ui.changeDialog({
		// 	id: props.id,
		// 	show: true,
		// 	type: "permission_user_details",
		// });
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<EyeIcon className="w-4 h-4" /> View Preview
			</button>
		</DropdownMenuItem>
	);
}
