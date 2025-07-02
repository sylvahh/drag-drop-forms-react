import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "name",
		type: "text",
		label: "Flow Name",
		placeholder: "Enter Flow Name",
		required: true,
	},

	{
		name: "description",
		type: "textarea",
		label: "Description",
		placeholder: "Enter Description",
		required: true,
	},
];
