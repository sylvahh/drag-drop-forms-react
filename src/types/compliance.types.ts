import { FILE_TYPES } from "@/constants/file-types";

export type FieldType =
	| "text"
	| "paragraph"
	| "email"
	| "radio"
	| "checkbox"
	| "dropdown"
	| "file"
	| "date"
	| "number"
	| "url"
	| "tel"
	| "info"
	| "header";

export type ComplianceElementType =
	| FieldType
	| "section"
	| "module"
	| "super_block"
	| "form_block"
	| "super_block_module"
	| "field_row";

export const LAYOUT_TYPES = ["1-column", "2-column", "3-column"] as const;
export type LayoutType = (typeof LAYOUT_TYPES)[number];

export const INFO_BLOCK_TYPES = ["info", "warning", "note"] as const;
export type InfoBlockType = (typeof INFO_BLOCK_TYPES)[number];

export type BaseField = {
	id: string;
	field_row_id: string;
	type: FieldType;
	hint_text?: string;
	created_at: string;
	updated_at: string;
};

export type FieldOption = {
	id: string;
	field_id: string;
	label: string;
	value: string;
	created_at: string;
	updated_at: string;
};

export type InputField = BaseField & {
	type:
		| "text"
		| "email"
		| "radio"
		| "checkbox"
		| "dropdown"
		| "file"
		| "date"
		| "number"
		| "url"
		| "tel";
	label: string;
	required: boolean;
	placeholder?: string;
	options?: FieldOption[];
	description?: string;
	max_length?: number;
	min_length?: number;
	min_value?: number;
	max_value?: number;
	step?: number;
	value?: any;
};

export type SelectField = InputField & {
	type: "dropdown";
	multi_select: boolean;
};

export const DATE_TYPES = ["date", "time", "datetime"] as const;
export type DateType = (typeof DATE_TYPES)[number];
export const DATE_FORMATS = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] as const;
export type DateFormat = (typeof DATE_FORMATS)[number];

export type DateField = InputField & {
	type: "date";
	date_type: DateType;
	date_format: DateFormat;
};

// Add a union type for common file types/extensions
export type FileTypeValue = (typeof FILE_TYPES)[number];

export type FileField = InputField & {
	type: "file";
	file_types: FileTypeValue[];
	max_file_size: number;
	multiple?: boolean;
	min_files?: number;
	max_files?: number;
};

export type InfoBlockField = BaseField & {
	content: string;
	type: "info";
	info_type: InfoBlockType;
};

export type TextBlockField = BaseField & {
	type: "header" | "paragraph";
	text: string;
};

export type ComplianceField =
	| InputField
	| InfoBlockField
	| TextBlockField
	| SelectField
	| DateField
	| FileField;

export type ComplianceFieldRow = {
	id: string;
	form_block_id: string | null;
	super_block_module_id: string | null;
	module_id: string | null;
	layout: LayoutType;
	fields: ComplianceField[];
	created_at: string;
	updated_at: string;
};

export type ComplianceFormBlock = {
	id: string;
	module_id: string;
	title: string;
	description?: string;
	field_rows: ComplianceFieldRow[];
	is_completed?: boolean;
	created_at: string;
	updated_at: string;
};

export type ComplianceSuperBlockModule = {
	id: string;
	super_block_id: string;
	title: string;
	field_rows: ComplianceFieldRow[];
	max_entries: number | null;
	min_entries: number | null;
	summary_fields?: ComplianceField[];
	is_completed?: boolean;
	created_at: string;
	updated_at: string;
};

export type ComplianceSuperBlock = {
	id: string;
	module_id: string;
	title: string;
	description?: string;
	super_block_modules: ComplianceSuperBlockModule[];
	is_completed?: boolean;
	created_at: string;
	updated_at: string;
};

export type ComplianceModule = {
	id: string;
	section_id: string;
	title: string;
	description?: string;
	field_rows: ComplianceFieldRow[];
	form_blocks: ComplianceFormBlock[];
	super_blocks: ComplianceSuperBlock[];
	is_completed?: boolean;
	created_at: string;
	updated_at: string;
};

export type ComplianceSection = {
	id: string;
	flow_id: string;
	title: string;
	description?: string;
	modules: ComplianceModule[];
	is_completed?: boolean;
	created_at: string;
	updated_at: string;
};

export type ComplianceFlow = {
	id: string;
	name: string;
	description: string;
	status: "published" | "draft";
	sections: ComplianceSection[];
	created_at: string;
	updated_at: string;
};
