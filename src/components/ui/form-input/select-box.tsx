import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import classnames from "classnames";

type SelectItem = {
	value: string;
	title: string;
};

type SelectBoxProps = {
	className?: string;
	containerStyle?: string;
	label?: string;
	options?: SelectItem[];
	showRestItem?: boolean;
	value?: string;
	onchange?: (item: string) => void;
	disabled?: boolean;
	contentMode?: "popper" | "item-aligned";
	side?: "top" | "bottom" | "left" | "right";
	placeholder?: string;
	name?: string;
	invalid?: boolean;
	required?: boolean;
	errorMessage?: string;
};

export default React.memo(function SelectBox(props: SelectBoxProps) {
	const { options = [], required = false, disabled = false, showRestItem = false } = props;

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = props.value?.toString();
		if (props.invalid && !userInput && props.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [props.invalid, props.value, props.required]);

	const container = classnames("input-container !outline-0", props.containerStyle);

	const selectContainer = classnames("shadow-none capitalize w-full !outline-0", props.className, {
		"!text-neutral-500 font-medium": !props.value?.trim(),
		invalid: isInvalid || !!props.errorMessage,
	});
	const errorCn = classnames("text-red-500 text-xs", {
		hidden: !props.errorMessage,
	});

	const change = (val: string) => {
		if (props.onchange) {
			props.onchange(val);
		}
	};
	return (
		<div className={container}>
			{props.label && (
				<label htmlFor={props.name} className="capitalize">
					{props.label} {props.required && "*"}
				</label>
			)}
			<Select
				value={props.value}
				onValueChange={change}
				name={props.name}
				disabled={disabled}
				required={required}
			>
				<SelectTrigger className={selectContainer}>
					<SelectValue placeholder={props.placeholder ?? "Select an item"} />
				</SelectTrigger>
				<SelectContent position={props.contentMode} side={props.side}>
					{showRestItem && (
						<SelectItem value={" "} className="capitalize">
							{props.placeholder ?? "Select an item"}
						</SelectItem>
					)}
					{options.map((item, idx) => (
						<SelectItem value={item.value} key={idx} className="capitalize">
							{item.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<small className={errorCn}>{props.errorMessage}</small>
		</div>
	);
});
