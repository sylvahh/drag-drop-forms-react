import { SelectBox } from "@/components/ui/form-input";
import { INVOICE_TYPES } from "@/types/invoice.types";
import * as React from "react";
import { FilterFormProps } from "./use-table-filter";

export default React.memo(function StatusFilter(props: FilterFormProps) {
	const options = ["all", ...INVOICE_TYPES].map((status) => ({
		title: status.split("_").join(" "),
		value: status,
	}));

	const change = (value: string) => {
		props.change("invoice_type", value);
	};
	return (
		<SelectBox
			label="Invoice Type"
			value={props.formData.invoice_type}
			placeholder="select invoice type"
			options={options}
			onchange={change}
			disabled={props.isLoading}
		/>
	);
});
