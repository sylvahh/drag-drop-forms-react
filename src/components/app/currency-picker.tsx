import * as React from "react";
import SelectBox from "../ui/form-input/select-box";
import useExtras from "@/hooks/use-extras";
import classNames from "classnames";

type Props = {
	classnames?: string;
	name: string;
	placeholder?: string;
	value: string;
	onChange: (e: string) => void;
	disabled?: boolean;
};
export default React.memo(function CurrencyPicker(props: Props) {
	const { currencies } = useExtras();
	const currenciesOptions = currencies.map((currency) => ({
		title: currency.currency_code,
		value: currency.id,
	}));
	const cn = classNames("p-0 pr-1 border-none", props.classnames);
	return (
		<SelectBox
			className={cn}
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onchange={(e) => props.onChange(e)}
			options={currenciesOptions}
			disabled={props.disabled}
		/>
	);
});
