import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type SidebarLink } from "../data";
import classNames from "classnames";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export type SidebarLinkProps = SidebarLink & {
	currentPath: string;
	activeLink: string;
	setActiveLink: React.Dispatch<React.SetStateAction<string>>;
	dept?: "1" | "2" | "3";
};
export default React.memo(function SidebarLink(link: SidebarLinkProps) {
	const {
		icon,
		name,
		activeIcon,
		path,
		relativePaths,
		currentPath,
		activeLink,
		setActiveLink,
		dept = "1",
	} = link;

	const isActive = React.useMemo(() => {
		const allPaths = [path, ...(relativePaths || [])];
		const formattedCurrentPath = currentPath.split("/");
		return (
			allPaths.some((pathPrefix) => {
				const formattedPath = pathPrefix ? pathPrefix.split("/") : [];
				return formattedCurrentPath.slice(1).includes(formattedPath[formattedPath.length - 1]);
			}) || activeLink == path
		);
	}, [activeLink, currentPath, path, relativePaths]);

	const cn = classNames(
		"flex items-center capitalize !px-0 py-0 transition-all duration-300 body-2 hover:!bg-transparent",
		{
			"!text-primary-300 !font-semibold": isActive,
			"text-white !font-normal": !isActive,
			"!pl-3": dept == "1",
			"!pl-5": dept == "2",
			"!pl-6": dept == "3",
		}
	);

	return (
		<SidebarMenuItem
			className="!p-0 list-none"
			onMouseOver={() => setActiveLink(path)}
			onMouseLeave={() => setActiveLink("")}
		>
			<SidebarMenuButton asChild className={cn}>
				<Link href={path}>
					{icon && activeIcon && (
						<Image src={isActive ? activeIcon : icon} alt={name} className="size-5"  style={{width:"auto", height:"auto"}} />
					)}
					<span>{name}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
});
