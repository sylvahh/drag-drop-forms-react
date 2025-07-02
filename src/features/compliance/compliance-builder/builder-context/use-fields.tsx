import {
	ComplianceField,
	ComplianceFieldRow,
	ComplianceSection,
	FieldType,
	FileField,
} from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceField from "@/services/compliance/fields/add-compliance-field";
import updateComplianceField from "@/services/compliance/fields/update-compliance-field";
import deleteComplianceField from "@/services/compliance/fields/delete-compliance-field";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import {
	InputField,
	SelectField,
	DateField,
	InfoBlockField,
	TextBlockField,
} from "@/types/compliance.types";
import { cloneField } from "./clone-utils";
import capitalize from "@/lib/capitalize";

export function useFields(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	function createDefaultField(fieldType: FieldType, fieldRowId: string): ComplianceField {
		const base = {
			id: uuidv4(),
			field_row_id: fieldRowId,
			type: fieldType,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		switch (fieldType) {
			case "dropdown":
				return {
					...base,
					label: "New Dropdown",
					required: false,
					placeholder: "Select an option",
					options: [],
					multi_select: false,
				} as SelectField;
			case "date":
				return {
					...base,
					label: "New Date",
					required: false,
					placeholder: "",
					options: [],
					date_type: "date",
					date_format: "YYYY-MM-DD",
				} as DateField;
			case "info":
				return {
					...base,
					content: "New Info Block",
					info_type: "info",
				} as InfoBlockField;
			case "header":
				return {
					...base,
					text: "New Header",
					type: "header",
				} as TextBlockField;
			case "paragraph":
				return {
					...base,
					text: "New Paragraph",
					type: "paragraph",
				} as TextBlockField;
			case "file":
				return {
					...base,
					label: "New File",
					required: false,
					placeholder: "",
					min_files: 1,
					max_files: 1,
				} as FileField;
			case "text":
			case "email":
			case "number":
			case "radio":
			case "checkbox":
			case "url":
			case "tel":
				return {
					...base,
					label: `New ${capitalize(fieldType)} Field`,
					required: false,
					placeholder: "",
					options: [],
				} as InputField;
			default:
				throw new Error(`Unknown field type: ${fieldType}`);
		}
	}

	// Add Field
	const addField = React.useCallback(async (fieldRowId: string, fieldType: FieldType) => {
		if (!fieldRowId || !fieldType) return;
		const newField: ComplianceField = {
			...createDefaultField(fieldType, fieldRowId),
		};
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => ({
					...module,
					field_rows: module.field_rows.map((row) =>
						row.id === fieldRowId ? { ...row, fields: [...row.fields, newField] } : row
					),
					form_blocks: module.form_blocks.map((formBlock) => ({
						...formBlock,
						field_rows: formBlock.field_rows.map((row) =>
							row.id === fieldRowId ? { ...row, fields: [...row.fields, newField] } : row
						),
					})),
					super_blocks: module.super_blocks.map((superBlock) => ({
						...superBlock,
						super_block_modules: superBlock.super_block_modules.map((sbm) => ({
							...sbm,
							field_rows: sbm.field_rows.map((row) =>
								row.id === fieldRowId ? { ...row, fields: [...row.fields, newField] } : row
							),
						})),
					})),
				})),
			}))
		);
		setUpdating(true);
		try {
			await addComplianceField({ fieldRowId, ...newField });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add field", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Update Field
	const updateField = React.useCallback(async (field: ComplianceField) => {
		if (!field.id) return;
		console.log("updates", field);
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => ({
					...module,
					field_rows: module.field_rows.map((row) =>
						row.id === field.field_row_id
							? {
									...row,
									fields: row.fields.map((f) => (f.id === field.id ? field : f)),
							  }
							: row
					),
					form_blocks: module.form_blocks.map((formBlock) => ({
						...formBlock,
						field_rows: formBlock.field_rows.map((row) =>
							row.id === field.field_row_id
								? {
										...row,
										fields: row.fields.map((f) => (f.id === field.id ? field : f)),
								  }
								: row
						),
					})),
					super_blocks: module.super_blocks.map((superBlock) => ({
						...superBlock,
						super_block_modules: superBlock.super_block_modules.map((sbm) => ({
							...sbm,
							field_rows: sbm.field_rows.map((row) =>
								row.id === field.field_row_id
									? {
											...row,
											fields: row.fields.map((f) => (f.id === field.id ? field : f)),
									  }
									: row
							),
						})),
					})),
				})),
			}))
		);
		setUpdating(true);
		try {
			await updateComplianceField(field);
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to update field", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Delete Field
	const deleteField = React.useCallback(async (fieldId: string, fieldRowId: string) => {
		if (!fieldId || !fieldRowId) return;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => ({
					...module,
					field_rows: module.field_rows.map((row) =>
						row.id === fieldRowId
							? { ...row, fields: row.fields.filter((f) => f.id !== fieldId) }
							: row
					),
					form_blocks: module.form_blocks.map((formBlock) => ({
						...formBlock,
						field_rows: formBlock.field_rows.map((row) =>
							row.id === fieldRowId
								? { ...row, fields: row.fields.filter((f) => f.id !== fieldId) }
								: row
						),
					})),
					super_blocks: module.super_blocks.map((superBlock) => ({
						...superBlock,
						super_block_modules: superBlock.super_block_modules.map((sbm) => ({
							...sbm,
							field_rows: sbm.field_rows.map((row) =>
								row.id === fieldRowId
									? { ...row, fields: row.fields.filter((f) => f.id !== fieldId) }
									: row
							),
						})),
					})),
				})),
			}))
		);
		try {
			await deleteComplianceField({ id: fieldId });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to delete field", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Duplicate Field
	const duplicateField = React.useCallback(async (fieldId: string, fieldRowId: string) => {
		setUpdating(true);
		let cloned: ComplianceField | null = null;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => ({
					...module,
					field_rows: module.field_rows.map((row) => {
						if (row.id !== fieldRowId) return row;
						const idx = row.fields.findIndex((f) => f.id === fieldId);
						if (idx === -1) return row;
						const original = row.fields[idx];
						cloned = cloneField(original, fieldRowId);
						const newFields = [
							...row.fields.slice(0, idx + 1),
							cloned,
							...row.fields.slice(idx + 1),
						];
						return { ...row, fields: newFields };
					}),
					form_blocks: module.form_blocks.map((formBlock) => ({
						...formBlock,
						field_rows: formBlock.field_rows.map((row) => {
							if (row.id !== fieldRowId) return row;
							const idx = row.fields.findIndex((f) => f.id === fieldId);
							if (idx === -1) return row;
							const original = row.fields[idx];
							cloned = cloneField(original, fieldRowId);
							const newFields = [
								...row.fields.slice(0, idx + 1),
								cloned,
								...row.fields.slice(idx + 1),
							];
							return { ...row, fields: newFields };
						}),
					})),
					super_blocks: module.super_blocks.map((superBlock) => ({
						...superBlock,
						super_block_modules: superBlock.super_block_modules.map((sbm) => ({
							...sbm,
							field_rows: sbm.field_rows.map((row) => {
								if (row.id !== fieldRowId) return row;
								const idx = row.fields.findIndex((f) => f.id === fieldId);
								if (idx === -1) return row;
								const original = row.fields[idx];
								cloned = cloneField(original, fieldRowId);
								const newFields = [
									...row.fields.slice(0, idx + 1),
									cloned,
									...row.fields.slice(idx + 1),
								];
								return { ...row, fields: newFields };
							}),
						})),
					})),
				})),
			}))
		);
		try {
			if (cloned) {
				await addComplianceField({ fieldRowId, ...cloned });
				updateLastUpdatedAt();
			}
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to duplicate field", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	return { addField, updateField, deleteField, duplicateField };
}
