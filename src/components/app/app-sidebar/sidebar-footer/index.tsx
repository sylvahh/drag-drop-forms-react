import * as React from "react";
import { SidebarFooter } from "@/components/ui/sidebar";
import useAppSelector from "@/store/hooks";
import AppImage from "../../app-image";
import { assets } from "@/constants";

export default React.memo(function AppSidebarFooter() {
	const { account } = useAppSelector("account");

	const fullName = React.useMemo(() => {
		return `${account?.first_name} ${account?.last_name}`;
	}, [account?.first_name, account?.last_name]);

	

	// const showLogoutDialog = () => {
	// 	ui.changeDialog({
	// 		show: true,
	// 		type: "logout",
	// 	});
	// };
	return (
		<SidebarFooter className="pb-0 bg-black-base">
			<div className="flex items-center gap-3 p-3">
				<AppImage src={assets.temp_01} alt="user" className="!size-10 rounded-full" />
				<div className="flex flex-col">
					<span className="font-semibold text-white capitalize body-2 line-clamp-1">
						{fullName}
					</span>
					<small className="font-normal body-2 text-neutral-400">{account?.user_id?.email}</small>
				</div>
				{/* <AppButton variant="ghost" className="!py-0" onClick={showLogoutDialog}>
					<Image src={assets.logout_01} alt="logout" />
				</AppButton> */}
			</div>
		</SidebarFooter>
	);
});
