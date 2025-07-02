import * as React from "react";
import classnames from "classnames";
import { assets } from "@/constants";


type DataNotFoundProps = {
	title?: string;
	text?: string;
	icon?: string;
	className?: string;
};

export default React.memo(function DataNotFound(props: DataNotFoundProps) {
	const container = classnames(
		"w-full h-full flex col-span-full flex-col items-center justify-center",
		props.className
	);
	return (
		<div className={container}>
			<img
				src={props.icon ?? assets.empty_01}
				alt="empty state illustration"
				width={96}
				height={96}
				className="size-24"
			/>
			{props.title && <h1 className="heading-7 text-neutral-1000">{props.title}</h1>}
			<p className="text-center body-2 text-neutral-500 max-w-96">
				{props.text ?? "No Data found"}
			</p>
		</div>
	);
});
