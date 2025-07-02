import { SelectBox } from "@/components/ui/form-input";
import * as React from "react";
import { FilterFormProps } from "./use-table-filter";
import { CUSTOMER_STATUS } from "@/types/customer.types";

export default React.memo(function StatusFilter(props: FilterFormProps) {
	const options = ["all", ...CUSTOMER_STATUS].map((status) => ({
		title: status.split("_").join(" "),
		value: status,
	}));

	const change = (value: string) => {
		props.change("customer_status", value);
	};
	return (
		<SelectBox
			label="Status"
			value={props.formData.customer_status}
			placeholder="select status"
			options={options}
			onchange={change}
			disabled={props.isLoading}
		/>
	);
});
