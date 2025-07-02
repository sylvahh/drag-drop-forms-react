import { Input } from "@/components/ui/form-input";
import * as React from "react";
import { FilterFormProps } from "./use-table-filter";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";

export default React.memo(function AmountFilter(props: FilterFormProps) {
	const change = (value: string) => {
		props.change("amount", value);
	};
	return (
		<Input
			type="text"
			label="Amount"
			placeholder="Amount"
			value={props.formData.amount}
			onChange={(e) => change(sanitizeNumInput(e.target.value))}
			disabled={props.isLoading}
		/>
	);
});
