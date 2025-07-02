import { ComplianceField } from "@/types/compliance.types";
import * as React from "react";

// Import all field preview components
import TextFieldPreview from "./text-field-preview";
import ParagraphFieldPreview from "./paragraph-field-preview";
import EmailFieldPreview from "./email-field-preview";
import RadioFieldPreview from "./radio-field-preview";
import CheckboxFieldPreview from "./checkbox-field-preview";
import DropdownFieldPreview from "./dropdown-field-preview";
import FileFieldPreview from "./file-field-preview";
import DateFieldPreview from "./date-field-preview";
import NumberFieldPreview from "./number-field-preview";
import UrlFieldPreview from "./url-field-preview";
import TelFieldPreview from "./tel-field-preview";
import InfoFieldPreview from "./info-field-preview";
import HeaderFieldPreview from "./header-field-preview";

export default function FieldsPreview({ field }: { field: ComplianceField }) {
	return (
		<React.Fragment>
			<TextFieldPreview field={field} />
			<ParagraphFieldPreview field={field} />
			<EmailFieldPreview field={field} />
			<RadioFieldPreview field={field} />
			<CheckboxFieldPreview field={field} />
			<DropdownFieldPreview field={field} />
			<FileFieldPreview field={field} />
			<DateFieldPreview field={field} />
			<NumberFieldPreview field={field} />
			<UrlFieldPreview field={field} />
			<TelFieldPreview field={field} />
			<InfoFieldPreview field={field} />
			<HeaderFieldPreview field={field} />
		</React.Fragment>
	);
}
