import { ComplianceFieldRow } from "@/types/compliance.types";
import classNames from "classnames";
import FieldsPreview from "../fields";

export default function FieldRowsPreview({ fieldRow }: { fieldRow: ComplianceFieldRow }) {
	const container = classNames("grid p-1", {
		"grid-cols-1 gap-2": fieldRow.layout === "1-column",
		"grid-cols-2 gap-4": fieldRow.layout === "2-column",
		"grid-cols-3 gap-4": fieldRow.layout === "3-column",
	});
	return (
		<div className={container}>
			{fieldRow.fields.map((field) => {
				return <FieldsPreview key={field.id} field={field} />;
			})}
		</div>
	);
}
