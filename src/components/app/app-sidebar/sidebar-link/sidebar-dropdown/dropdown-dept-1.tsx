import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import SidebarDropdown from ".";
import SidebarLink, { SidebarLinkProps } from "..";
import classNames from "classnames";
import * as React from "react";

type Dept1Props = SidebarLinkProps & {};

export default function DropdownDept1(props: Dept1Props) {
	


	const labelCn = classNames(
		"flex items-center gap-2 capitalize p-0 pl-3 transition-all duration-300 body-2 !font-bold !text-neutral-600/80" , {
			
			// "!text-primary-300 rounded-md !font-semibold": isActive,
			// "text-white !font-normal": !isActive,
		
		}
	);
	return (
		<SidebarGroup className="!p-0">
			<SidebarGroupLabel asChild className="!text-white">
				<div className={labelCn}>
					<span className="!text-neutral-700">{props.name}</span>
				</div>
			</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu className="gap-0">
						{props.subLinks?.map((item) => {
							if (item.subLinks?.length) {
								return (
									<SidebarDropdown
										key={item.name}
										currentPath={props.currentPath}
										activeLink={props.activeLink}
										setActiveLink={props.setActiveLink}
										dept="2"
										{...item}
									/>
								);
							}
							return (
								<SidebarLink
									key={item.name}
									currentPath={props.currentPath}
									activeLink={props.activeLink}
									setActiveLink={props.setActiveLink}
									{...item}
									dept="1"
								/>
							);
						})}
					</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

//THIS IS THE OLD CODE FOR THE DEPT 2 DROPDOWN
	// const labelCn = classNames(
	// 	"flex items-center gap-2 capitalize px-3 py-0 pl-6 transition-all duration-300 body-2"
	// );
	// return (
	// 	<SidebarGroup className="!p-0">
	// 		<SidebarGroupLabel asChild className="!text-white">
	// 			<div className={labelCn}>
	// 				<span className="!text-primary-300">{props.name}</span>
	// 			</div>
	// 		</SidebarGroupLabel>
	// 		<SidebarGroupContent>
	// 			<SidebarMenu className="gap-0">
	// 				{props.subLinks?.map((item) => {
	// 					return (
	// 						<SidebarLink
	// 							key={item.name}
	// 							currentPath={props.currentPath}
	// 							activeLink={props.activeLink}
	// 							setActiveLink={props.setActiveLink}
	// 							{...item}
	// 							dept={"3"}
	// 						/>
	// 					);
	// 				})}
	// 			</SidebarMenu>
	// 		</SidebarGroupContent>
	// 	</SidebarGroup>
	// );