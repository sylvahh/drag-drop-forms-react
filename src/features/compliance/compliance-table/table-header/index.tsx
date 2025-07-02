"use client";
import TableFilter from "./table-filter";
import AddCustomer from "./create-flow";
import ExportCsv from "./export-csv";
import TableSearchBar from "./table-search-bar";

export type HeaderProps = {
	disabled: boolean;
};

export default function TableHeader(props: HeaderProps) {
	return (
		<div className="flex items-center justify-between pb-4 border-b border-neutral-200">
			<div className="flex items-center flex-1 gap-4">
				<TableFilter disabled={props.disabled} />
				<TableSearchBar disabled={props.disabled} />
			</div>
			<div className="flex items-center justify-between  [&_button]:p-2 px-2 py-3 gap-3">
				<AddCustomer disabled={props.disabled} />
			</div>
		</div>
	);
}
