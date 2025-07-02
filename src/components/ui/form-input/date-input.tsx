import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import classNames from "classnames";

import * as React from "react";

type DatePickerProps = {
	id?: string;
	name?: string;
	value?: Date | undefined;
	onChange?: (value: Date) => void;
	disabled?: boolean;
	triggerStyle?: string;
	disableMonthNavigation?: boolean;
	daySelectedStyle?: string;
	showOutsideDays?: boolean;

	label?: string;
	placeholder?: string;
	containerStyle?: string;
	hideIcon?: boolean;
	invalid?: boolean;
	overrideInvalid?: boolean;
	required?: boolean;
};

export default function DateInput({
	id,
	name,
	value,
	onChange,
	showOutsideDays = true,
	label,
	placeholder,
	disabled,
	containerStyle,
	invalid,

	...props
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = value?.toString();
		if (props.overrideInvalid) {
			isInvalid = true;
		} else if (invalid && !userInput && props.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, value, props.required, props.overrideInvalid]);

	const daySelectedCn = classNames(
		"bg-primary text-stone-50 hover:bg-primary hover:text-stone-50 focus:bg-primary focus:text-stone-50",
		props.daySelectedStyle
	);

	const triggerCn = classNames(
		"w-[280px] justify-start text-left font-normal",
		props.triggerStyle,
		{
			"text-muted-foreground": !value,
			invalid: isInvalid,
		}
	);

	const container = classNames("input-container", containerStyle);

	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	const toggleOpen = () => {
		setOpen(!open);
	};

	const handleSelect = (selected: Date) => {
		if (onChange) {
			onChange(selected);
			setOpen(false);
		}
	};

	return (
		<div className={container}>
			{label && (
				<label htmlFor={name} className="capitalize ">
					{label} {props.required && "*"}
				</label>
			)}
			<Popover modal={true} open={open} onOpenChange={handleOpenChange}>
				<PopoverTrigger asChild>
					<Button
						id={id}
						name={name}
						variant={"outline"}
						className={triggerCn}
						onClick={toggleOpen}
						disabled={disabled}
					>
						<CalendarIcon className="w-4 h-4 mr-2" />
						{value ? format(value, "PPP") : <span> {placeholder ?? "Pick a date"}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="z-50 w-auto p-0">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(selected) => {
							if (selected) {
								handleSelect(selected);
							}
						}}
						initialFocus
						showOutsideDays={showOutsideDays}
						month={showOutsideDays ? undefined : new Date()}
						classNames={{
							day_selected: daySelectedCn,
							caption: "flex flex-col gap-2 text-center",
						}}
						disableNavigation={!showOutsideDays && true}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
