import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import classNames from "classnames";
import SidebarLink, { SidebarLinkProps } from "..";
import * as React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Dept2Props = SidebarLinkProps & {};

export default function DropdownDept2(props: Dept2Props) {
	const { name, icon, activeIcon, path, currentPath, activeLink, setActiveLink } = props;
	const isActive = React.useMemo(() => {
		return currentPath.includes(path) || activeLink === path;
	}, [path, currentPath, activeLink]);
	const triggerCn = classNames(
		"flex items-center gap-2 capitalize px-3 py-0 transition-all duration-300 body-2",
		{
			"!text-primary-300 rounded-md !font-semibold": isActive,
			"text-white !font-normal": !isActive,
		}
	);
	const chevronCn = classNames(
		"ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90",
		{
			"text-primary-300": isActive,
			"text-white": !isActive,
		}
	);
	return (
		<Collapsible defaultOpen={false} className="group/collapsible">
			<SidebarGroup className="!p-0  space-y-0">
				<SidebarGroupLabel
					asChild
					onMouseEnter={() => setActiveLink(path)}
					onMouseLeave={() => setActiveLink("")}
				>
					<CollapsibleTrigger className={triggerCn}>
						{icon && activeIcon && (
							<Image src={isActive ? activeIcon : icon} alt={name} className="size-5" />
						)}
						<span className="">{props.name}</span>
						<ChevronRight className={chevronCn} />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu className="gap-0">
							{props.subLinks?.map((item) => {
								return (
									<SidebarLink
										key={item.name}
										currentPath={props.currentPath}
										activeLink={props.activeLink}
										setActiveLink={props.setActiveLink}
										{...item}
										dept={"3"}
									/>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}

// THIS IS THE OLD CODE FOR THE DEPT 1 DROPDOWN
// const { name, icon, activeIcon, path, currentPath, activeLink, setActiveLink } = props;

// 	const isActive = React.useMemo(() => {
// 		return currentPath.includes(path) || activeLink === path;
// 	}, [path, currentPath, activeLink]);

// 	const triggerCn = classNames(
// 		"flex items-center gap-2 capitalize px-3 py-0 transition-all duration-300 body-2",
// 		{
// 			"!text-primary-300 rounded-md !font-semibold": isActive,
// 			"text-white !font-normal": !isActive,
// 		}
// 	);

// 	const chevronCn = classNames(
// 		"ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90",
// 		{
// 			"text-primary-300": isActive,
// 			"text-white": !isActive,
// 		}
// 	);

// 	return (
// 		<Collapsible defaultOpen={false} className="group/collapsible">
// 			<SidebarGroup className="!p-0  space-y-0">
// 				<SidebarGroupLabel
// 					asChild
// 					onMouseEnter={() => setActiveLink(path)}
// 					onMouseLeave={() => setActiveLink("")}
// 				>
// 					<CollapsibleTrigger className={triggerCn}>
// 						{icon && activeIcon && (
// 							<Image src={isActive ? activeIcon : icon} alt={name} className="size-5" />
// 						)}
// 						<span className="">{props.name}</span>
// 						<ChevronRight className={chevronCn} />
// 					</CollapsibleTrigger>
// 				</SidebarGroupLabel>
// 				<CollapsibleContent>
// 					<SidebarGroupContent>
// 						<SidebarMenu className="gap-0">
// 							{props.subLinks?.map((item) => {
// 								if (item.subLinks?.length) {
// 									return (
// 										<SidebarDropdown
// 											key={item.name}
// 											currentPath={props.currentPath}
// 											activeLink={props.activeLink}
// 											setActiveLink={props.setActiveLink}
// 											dept="2"
// 											{...item}
// 										/>
// 									);
// 								}
// 								return (
// 									<SidebarLink
// 										key={item.name}
// 										currentPath={props.currentPath}
// 										activeLink={props.activeLink}
// 										setActiveLink={props.setActiveLink}
// 										{...item}
// 										dept="1"
// 									/>
// 								);
// 							})}
// 						</SidebarMenu>
// 					</SidebarGroupContent>
// 				</CollapsibleContent>
// 			</SidebarGroup>
// 		</Collapsible>
// )
