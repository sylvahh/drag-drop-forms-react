import { SelectBox } from "@/components/ui/form-input";
import * as React from "react";
import { FilterFormProps } from "./use-table-filter";
import useAppSelector from "@/store/hooks";

export default React.memo(function CurrencyFilter(props: FilterFormProps) {
	const { currencies } = useAppSelector("init");

	const options = React.useMemo(
		() =>
			currencies.map((item) => ({
				title: item.currency_code,
				value: item.id,
			})),
		[currencies]
	);

	const change = (value: string) => {
		props.change("currency_id", value);
	};
	return (
		<SelectBox
			label="Currency"
			value={props.formData.currency_id}
			placeholder="select currency"
			options={options}
			onchange={change}
			disabled={props.isLoading}
		/>
	);
});
