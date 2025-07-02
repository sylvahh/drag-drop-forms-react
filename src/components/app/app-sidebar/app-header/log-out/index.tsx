import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import useActions from "@/store/actions";
import Image from "next/image";

export default function LogOut() {
	const { ui } = useActions();

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "logout",
		});
	};

	return (
		<DropdownMenuItem className="px-2 py-1.5">
			<button className="flex gap-3 p-3" onClick={click}>
				<Image src={assets.sign_out_icon_01} alt="sign out" />
				<h2 className="font-semibold body-2 text-neutral-900">Sign Out</h2>
			</button>
		</DropdownMenuItem>
	);
}
