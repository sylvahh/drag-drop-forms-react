import { ComplianceElementType, FieldType } from "@/types/compliance.types";
import {
	checkboxIcon,
	dateIcon,
	emailIcon,
	fileIcon,
	formBlockIcon,
	headerIcon,
	moduleIcon,
	numberIcon,
	paragraphIcon,
	radioIcon,
	sectionIcon,
	superBlockModuleIcon,
	textIcon,
	urlIcon,
} from "./icons";
import { dropdownIcon, fieldRowIcon, infoIcon, superBlockIcon, telIcon } from "./icons";

export type ElementDefinition = {
	type: ComplianceElementType;
	title: string;
	description: string;
	icon: string;
	category: "field" | "structure" | "content";
};

export const elementDefinitions: ElementDefinition[] = [
	{
		type: "text",
		title: "Text Field",
		description: "Single line text input",
		icon: textIcon,
		category: "field",
	},
	{
		type: "email",
		title: "Email",
		description: "Email address input",
		icon: emailIcon,
		category: "field",
	},
	{
		type: "number",
		title: "Number",
		description: "Numeric input field with constraints",
		icon: numberIcon,
		category: "field",
	},
	{
		type: "date",
		title: "Date",
		description: "Date picker with format options",
		icon: dateIcon,
		category: "field",
	},
	{
		type: "tel",
		title: "Phone",
		description: "Phone number input field",
		icon: telIcon,
		category: "field",
	},
	{
		type: "url",
		title: "URL",
		description: "Website URL input field",
		icon: urlIcon,
		category: "field",
	},
	{
		type: "file",
		title: "File Upload",
		description: "File upload component",
		icon: fileIcon,
		category: "field",
	},
	{
		type: "radio",
		title: "Radio Button",
		description: "Single selection from multiple options",
		icon: radioIcon,
		category: "field",
	},
	{
		type: "checkbox",
		title: "Checkbox",
		description: "Multiple selection options",
		icon: checkboxIcon,
		category: "field",
	},
	{
		type: "dropdown",
		title: "Dropdown",
		description: "Select from dropdown list",
		icon: dropdownIcon,
		category: "field",
	},
	{
		type: "header",
		title: "Header",
		description: "Section header or title",
		icon: headerIcon,
		category: "field",
	},
	{
		type: "paragraph",
		title: "Paragraph",
		description: "Multi-line text content",
		icon: paragraphIcon,
		category: "field",
	},
	{
		type: "info",
		title: "Info Block",
		description: "Information, warning, or note block",
		icon: infoIcon,
		category: "field",
	},
	{
		type: "section",
		title: "Section",
		description: "Top-level form page",
		icon: sectionIcon,
		category: "structure",
	},
	{
		type: "module",
		title: "Module",
		description: "Group of related form blocks",
		icon: moduleIcon,
		category: "structure",
	},
	{
		type: "super_block",
		title: "Super Block",
		description: "Repeatable group container",
		icon: superBlockIcon,
		category: "structure",
	},
	{
		type: "form_block",
		title: "Form Block",
		description: "Container for form fields rows",
		icon: formBlockIcon,
		category: "structure",
	},
	{
		type: "super_block_module",
		title: "Super Block Module",
		description: "Module within a super block",
		icon: superBlockModuleIcon,
		category: "structure",
	},
	{
		type: "field_row",
		title: "Field Row",
		description: "field container Holds fields layout",
		icon: fieldRowIcon,
		category: "structure",
	},
];
