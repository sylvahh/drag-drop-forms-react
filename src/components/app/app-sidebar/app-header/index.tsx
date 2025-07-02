"use client";
import * as React from "react";
import Notifications from "./notifications";
import FeatureInfo from "./feature-info";
import Breadcrumbs from "./breadcrumbs";
import UserIcon from "./user-icon";

export default React.memo(function AppHeader() {
	return (
		<header className="flex items-end gap-5 px-3 pt-2 pb-3.5 border-b lg:px-5">
			<div className="flex items-center justify-between h-full gap-3 grow">
				<Breadcrumbs />

				<div className="flex items-center justify-center gap-5">
					<FeatureInfo />
					<Notifications />
					<UserIcon />	
				</div>
			</div>
			{/* <Separator orientation="vertical" className="!bg-neutral-400" />
			<div className="flex items-end justify-between gap-3  xl:w-[25%]">
				<BusinessSwitch />
			</div> */}
		</header>
	);
});
