import * as React from "react";
import useAppSelector from "@/store/hooks";
import { ChevronRight } from "lucide-react";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function Breadcrumbs() {
	const { pathname } = useCustomNavigation();
	const { pageTitle } = useAppSelector("ui");
	
	const splittedTitle = React.useMemo(
		() => (pageTitle ? pageTitle.split(",") : pathname.slice(1).split("/")),
		[pageTitle, pathname]
	);
	return (
		<div className="flex items-center w-full gap-1 overflow-x-auto xl:overflow-x-hidden hide-scrollbar">
			{splittedTitle.map((title, idx) => {
				return (
					<div key={title} className="flex items-center gap-1">
						<h3 key={title} className="!font-semibold body-1 capitalize">
							{title.trim().replace("_", " ")}
						</h3>
						{idx !== splittedTitle.length - 1 && <ChevronRight className="w-4 h-4" />}
					</div>
				);
			})}
		</div>
	);
});
