import { DateInput } from "@/components/ui/form-input";
import * as React from "react";
import { FilterFormProps } from "./use-table-filter";
import classNames from "classnames";

export default React.memo(function LastTransactionDateFilter(props: FilterFormProps) {
	const [from, to] = props.formData.last_transaction_date.split(" - ");
	const init = { from: from ?? "", to: to ?? "" };
	const [dateRange, setDateRange] = React.useState(init);

	const change = (type: keyof typeof dateRange, value: string) => {
		setDateRange((prev) => ({ ...prev, [type]: value }));
	};

	React.useMemo(() => {
		if (!dateRange.from || !dateRange.to) return;
		props.change("last_transaction_date", `${dateRange.from} - ${dateRange.to}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateRange.from, dateRange.to]);

	const placeholders: Record<keyof typeof dateRange, string> = {
		from: "Start Date",
		to: "End Date",
	};

	React.useMemo(() => {
		if (props.formData.last_transaction_date) return;
		setDateRange(init);
	}, [props.formData.last_transaction_date]);

	return (
		<div>
			<span className="mb-1 text-gray-500 text-b-2">Last Transaction Date</span>
			<div className="flex items-center gap-0 border rounded-lg">
				{Object.entries(dateRange).map(([key, value], index) => {
					const itemKey = key as keyof typeof dateRange;
					const triggerCn = classNames("!outline-none w-full border-0 !rounded-lg px-2", {
						"!rounded-r-none": index === 0,
						"!rounded-l-none border-l": index === Object.entries(dateRange).length - 1,
					});
					return (
						<div className="w-full overflow-auto hide-scrollbar" key={key}>
							<DateInput
								name={itemKey}
								value={value ? new Date(dateRange[itemKey]) : undefined}
								onChange={(e) => change(itemKey, e.toISOString())}
								placeholder={placeholders[itemKey]}
								triggerStyle={triggerCn}
								containerStyle="!border-none !outline-none rounded-none "
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
});
