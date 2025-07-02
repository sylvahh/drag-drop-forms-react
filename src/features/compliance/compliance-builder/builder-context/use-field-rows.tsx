import { ComplianceFieldRow, ComplianceSection } from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceFieldRow from "@/services/compliance/field-rows/add-compliance-field-row";
import updateComplianceFieldRow from "@/services/compliance/field-rows/update-compliance-field-row";
import deleteComplianceFieldRow from "@/services/compliance/field-rows/delete-compliance-field-row";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { cloneFieldRow } from "./clone-utils";

type ParentType = "form_block" | "module" | "super_block_module";

export function useFieldRows(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	// Add Field Row
	const addFieldRow = React.useCallback(async (parentId: string, parentType: ParentType) => {
		if (!parentId) return;
		const newFieldRow: ComplianceFieldRow = {
			id: uuidv4(),
			form_block_id: parentType === "form_block" ? parentId : null,
			module_id: parentType === "module" ? parentId : null,
			super_block_module_id: parentType === "super_block_module" ? parentId : null,
			layout: "1-column",
			fields: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => {
					if (parentType === "module" && module.id === parentId) {
						return { ...module, field_rows: [...module.field_rows, newFieldRow] };
					}
					if (parentType === "form_block") {
						return {
							...module,
							form_blocks: module.form_blocks.map((formBlock) =>
								formBlock.id === parentId
									? { ...formBlock, field_rows: [...formBlock.field_rows, newFieldRow] }
									: formBlock
							),
						};
					}
					if (parentType === "super_block_module") {
						if (
							module.super_blocks.some((superBlock) =>
								superBlock.super_block_modules.some((sbm) => sbm.id === parentId)
							)
						) {
							return {
								...module,
								super_blocks: module.super_blocks.map((superBlock) => ({
									...superBlock,
									super_block_modules: superBlock.super_block_modules.map((sbm) =>
										sbm.id === parentId
											? { ...sbm, field_rows: [...sbm.field_rows, newFieldRow] }
											: sbm
									),
								})),
							};
						}
						return module;
					}
					return module;
				}),
			}))
		);
		setUpdating(true);
		try {
			await addComplianceFieldRow({ parentId, parentType, ...newFieldRow });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add field row", { description: errorMsg });
			throw error;
		} finally {
			setUpdating(false);
		}
	}, []);

	// Update Field Row
	const updateFieldRow = React.useCallback(
		async (fieldRow: ComplianceFieldRow, parentType: ParentType) => {
			if (!fieldRow.id) return;
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => {
						if (parentType === "module" && module.id === fieldRow.module_id) {
							return {
								...module,
								field_rows: module.field_rows.map((fr) => (fr.id === fieldRow.id ? fieldRow : fr)),
							};
						}
						if (parentType === "form_block") {
							return {
								...module,
								form_blocks: module.form_blocks.map((formBlock) =>
									formBlock.id === fieldRow.form_block_id
										? {
												...formBlock,
												field_rows: formBlock.field_rows.map((fr) =>
													fr.id === fieldRow.id ? fieldRow : fr
												),
										  }
										: formBlock
								),
							};
						}
						if (parentType === "super_block_module") {
							return {
								...module,
								super_blocks: module.super_blocks.map((superBlock) => ({
									...superBlock,
									super_block_modules: superBlock.super_block_modules.map((sbm) =>
										sbm.id === fieldRow.super_block_module_id
											? {
													...sbm,
													field_rows: sbm.field_rows.map((fr) =>
														fr.id === fieldRow.id ? fieldRow : fr
													),
											  }
											: sbm
									),
								})),
							};
						}
						return module;
					}),
				}))
			);
			setUpdating(true);
			try {
				await updateComplianceFieldRow(fieldRow);
				updateLastUpdatedAt();
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to update field row", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	// Delete Field Row
	const deleteFieldRow = React.useCallback(
		async (fieldRowId: string, parentId: string, parentType: ParentType) => {
			if (!fieldRowId) return;
			setUpdating(true);
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => {
						if (parentType === "module" && module.id === parentId) {
							return {
								...module,
								field_rows: module.field_rows.filter((fr) => fr.id !== fieldRowId),
							};
						}
						if (parentType === "form_block") {
							return {
								...module,
								form_blocks: module.form_blocks.map((formBlock) =>
									formBlock.id === parentId
										? {
												...formBlock,
												field_rows: formBlock.field_rows.filter((fr) => fr.id !== fieldRowId),
										  }
										: formBlock
								),
							};
						}
						if (parentType === "super_block_module") {
							return {
								...module,
								super_blocks: module.super_blocks.map((superBlock) => ({
									...superBlock,
									super_block_modules: superBlock.super_block_modules.map((sbm) =>
										sbm.id === parentId
											? {
													...sbm,
													field_rows: sbm.field_rows.filter((fr) => fr.id !== fieldRowId),
											  }
											: sbm
									),
								})),
							};
						}
						return module;
					}),
				}))
			);
			try {
				await deleteComplianceFieldRow({ id: fieldRowId });
				updateLastUpdatedAt();
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to delete field row", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	// Duplicate Field Row
	const duplicateFieldRow = React.useCallback(
		async (fieldRowId: string, parentId: string, parentType: ParentType) => {
			setUpdating(true);
			let cloned: ComplianceFieldRow | null = null;
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => {
						if (parentType === "module" && module.id === parentId) {
							const idx = module.field_rows.findIndex((fr) => fr.id === fieldRowId);
							if (idx === -1) return module;
							const original = module.field_rows[idx];
							cloned = cloneFieldRow(original, {
								module_id: parentId,
								form_block_id: null,
								super_block_module_id: null,
							});
							const newFieldRows = [
								...module.field_rows.slice(0, idx + 1),
								cloned,
								...module.field_rows.slice(idx + 1),
							];
							return { ...module, field_rows: newFieldRows };
						}
						if (parentType === "form_block") {
							return {
								...module,
								form_blocks: module.form_blocks.map((formBlock) => {
									if (formBlock.id !== parentId) return formBlock;
									const idx = formBlock.field_rows.findIndex((fr) => fr.id === fieldRowId);
									if (idx === -1) return formBlock;
									const original = formBlock.field_rows[idx];
									cloned = cloneFieldRow(original, {
										form_block_id: parentId,
										module_id: null,
										super_block_module_id: null,
									});
									const newFieldRows = [
										...formBlock.field_rows.slice(0, idx + 1),
										cloned,
										...formBlock.field_rows.slice(idx + 1),
									];
									return { ...formBlock, field_rows: newFieldRows };
								}),
							};
						}
						if (parentType === "super_block_module") {
							return {
								...module,
								super_blocks: module.super_blocks.map((superBlock) => ({
									...superBlock,
									super_block_modules: superBlock.super_block_modules.map((sbm) => {
										if (sbm.id !== parentId) return sbm;
										const idx = sbm.field_rows.findIndex((fr) => fr.id === fieldRowId);
										if (idx === -1) return sbm;
										const original = sbm.field_rows[idx];
										cloned = cloneFieldRow(original, {
											super_block_module_id: parentId,
											form_block_id: null,
											module_id: null,
										});
										const newFieldRows = [
											...sbm.field_rows.slice(0, idx + 1),
											cloned,
											...sbm.field_rows.slice(idx + 1),
										];
										return { ...sbm, field_rows: newFieldRows };
									}),
								})),
							};
						}
						return module;
					}),
				}))
			);
			try {
				if (cloned) {
					await addComplianceFieldRow({ parentId, parentType, ...cloned });
					updateLastUpdatedAt();
				}
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to duplicate field row", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	return { addFieldRow, updateFieldRow, deleteFieldRow, duplicateFieldRow };
}
