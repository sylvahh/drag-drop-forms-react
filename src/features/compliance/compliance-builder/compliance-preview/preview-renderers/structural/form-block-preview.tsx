import { ComplianceFormBlock } from "@/types/compliance.types";
import FieldRowsPreview from "./field-rows-preview";

export default function FormBlockPreview({ formBlock }: { formBlock: ComplianceFormBlock }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h2 className="heading-7">{formBlock.title}</h2>
				<p className="body-2 text-neutral-700">{formBlock.description}</p>
			</div>
			{formBlock.field_rows.map((fieldRow) => {
				return <FieldRowsPreview key={fieldRow.id} fieldRow={fieldRow} />;
			})}
		</div>
	);
}
