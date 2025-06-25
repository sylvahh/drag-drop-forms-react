
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

export const LAYOUT_TYPES = ["1-column", "2-column", "3-column"] as const;
export type LayoutType = (typeof LAYOUT_TYPES)[number];

export const INFO_BLOCK_TYPES = ["info", "warning", "note"] as const;
export type InfoBlockType = (typeof INFO_BLOCK_TYPES)[number];

export type BaseField = {
	id: string;
	field_row_id: string;
	type: FieldType;
	hint_text?: string;
};

export type FieldOption = {
	id: string;
	field_id: string;
	label: string;
	value: string;
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

export type InfoBlockField = BaseField & {
	content: string;
	type: "info";
	info_type: InfoBlockType;
};

export type TextBlockField = BaseField & {
	type: "header" | "paragraph";
	text: string;
};

export type Field = InputField | InfoBlockField | TextBlockField | SelectField | DateField;

export type FieldRow = {
	id: string;
	form_block_id: string | null;
	super_block_module_id: string | null;
	module_id: string | null;
	layout: LayoutType;
	fields: Field[];
};

export type FormBlock = {
	id: string;
	module_id: string;
	title: string;
	description?: string;
	field_rows: FieldRow[];
};

export type SuperBlockModule = {
	id: string;
	super_block_id: string;
	title: string;
	field_rows: FieldRow[];
};

export type SuperBlock = {
	id: string;
	module_id: string;
	title: string;
	description?: string;
	max_entries: number | null;
	min_entries: number | null;
	super_block_modules: SuperBlockModule[];
};

export type Module = {
	id: string;
	section_id: string;
	title: string;
	description?: string;
	field_rows: FieldRow[];
	form_blocks: FormBlock[];
	super_blocks: SuperBlock[];
};

export type Section = {
	id: string;
	flow_id: string;
	title: string;
	description?: string;
	modules: Module[];
};

export type Flow = {
	id: string;
	name: string;
	description: string;
	sections: Section[];
	createdAt: Date;
	updatedAt: Date;
};
