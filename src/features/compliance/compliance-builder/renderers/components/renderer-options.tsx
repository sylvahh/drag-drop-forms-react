import { Button } from "@/components/ui/button";
import {
	settingsIcon,
	copyIcon,
	deleteIcon,
	settingsIcon02,
	copyIcon02,
	deleteIcon02,
} from "../icons";
import classNames from "classnames";

type OptionsProps = {
	handleConfigure: () => void;
	handleDuplicate: () => void;
	handleDelete: () => void;
	scope?: "side" | "top" | "field";
};
export default function RendererOptions({ scope = "top", ...props }: OptionsProps) {
	const isTop = scope === "top" || scope === "field";
	const container = classNames(
		"flex  absolute top-0 right-0 z-10 border rounded-lg shadow-md transition-opacity duration-300",
		{
			"flex-col top-0 -right-[40px]  bg-white border-black": scope === "side",
			"flex-row -top-[50px] right-4 bg-neutral-900": scope === "top",
			"flex-row -top-3 right-0 bg-neutral-900 group-hover:opacity-100 opacity-0": scope === "field",
		}
	);

	const buttonClx = classNames("bg-transparent p-2 border rounded-none ", {
		"!border-x-0 !border-t-0 !border-b last:!border-b-0 border-black first:rounded-t-lg last:rounded-b-lg":
			scope === "side",
		"!border-x-0 !border-t-0 !border-r last:!border-r-0 border-white hover:bg-neutral-700 first:rounded-l-lg last:rounded-r-lg":
			scope === "top" || scope === "field",
	});

	const iconClx = classNames("", {
		"size-5": scope === "side",
		"size-4": scope === "top" || scope === "field",
	});
	return (
		<div className={container}>
			<Button variant="outline" size="sm" onClick={props.handleConfigure} className={buttonClx}>
				<img src={isTop ? settingsIcon02 : settingsIcon} alt="settings" className={iconClx} />
				<span className="sr-only">Configure</span>
			</Button>

			<Button variant="outline" size="sm" onClick={props.handleDuplicate} className={buttonClx}>
				<img src={isTop ? copyIcon02 : copyIcon} alt="copy" className={iconClx} />
				<span className="sr-only">Duplicate</span>
			</Button>
			<Button variant="outline" size="sm" onClick={props.handleDelete} className={buttonClx}>
				<img src={isTop ? deleteIcon02 : deleteIcon} alt="delete" className={iconClx} />
				<span className="sr-only">Delete</span>
			</Button>
		</div>
	);
}
