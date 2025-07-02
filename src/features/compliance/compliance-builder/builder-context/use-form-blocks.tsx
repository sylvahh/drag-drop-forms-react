import {
	ComplianceFlow,
	ComplianceFormBlock,
	ComplianceModule,
	ComplianceSection,
} from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceModule from "@/services/compliance/modules/add-compliance-module";
import updateComplianceModule from "@/services/compliance/modules/update-compliance-module";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import deleteComplianceModule from "@/services/compliance/modules/delete-compliance-module";
import addComplianceFormBlock from "@/services/compliance/form-blocks/add-compliance-form-blocks";
import updateComplianceFormBlock from "@/services/compliance/form-blocks/update-compliance-form-blocks";
import deleteComplianceFormBlock from "@/services/compliance/form-blocks/delete-compliance-form-blocks";
import { cloneFormBlock } from "./clone-utils";

export function useFormBlocks(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	//Module functions
	const addFormBlock = React.useCallback(async (moduleId: string) => {
		if (!moduleId) return;
		const newFormBlock: ComplianceFormBlock = {
			id: uuidv4(),
			module_id: moduleId,
			title: "New Form Block",
			description: "",
			field_rows: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		setSections((prev) =>
			prev.map((session) => ({
				...session,
				modules: session.modules.map((module) => ({
					...module,
					form_blocks: [...module.form_blocks, newFormBlock],
				})),
			}))
		);

		setUpdating(true);
		try {
			await addComplianceFormBlock({
				module_id: moduleId,
				...newFormBlock,
			});
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add compliance form block", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const updateFormBlock = React.useCallback(async (formBlock: ComplianceFormBlock) => {
		if (!formBlock.id) return;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) =>
					module.id === formBlock.module_id
						? {
								...module,
								form_blocks: module.form_blocks.map((fb) =>
									fb.id === formBlock.id ? formBlock : fb
								),
						  }
						: module
				),
			}))
		);

		setUpdating(true);
		try {
			await updateComplianceFormBlock({ id: formBlock.id, ...formBlock });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to update compliance module", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const deleteFormBlock = React.useCallback(async (formBlockId: string) => {
		if (!formBlockId) return;
		setUpdating(true);
		setSections((prev) =>
			prev.map((s) => ({
				...s,
				modules: s.modules.map((m) => ({
					...m,
					form_blocks: m.form_blocks.filter((f) => f.id !== formBlockId),
				})),
			}))
		);
		try {
			await deleteComplianceFormBlock({ id: formBlockId });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to delete compliance module", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const duplicateFormBlock = React.useCallback(async (moduleId: string, formBlockId: string) => {
		setUpdating(true);
		let cloned: ComplianceFormBlock | null = null;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => {
					if (module.id !== moduleId) return module;
					const idx = module.form_blocks.findIndex((fb) => fb.id === formBlockId);
					if (idx === -1) return module;
					const original = module.form_blocks[idx];
					cloned = cloneFormBlock(original, moduleId);
					// Insert after the original
					const newFormBlocks = [
						...module.form_blocks.slice(0, idx + 1),
						cloned,
						...module.form_blocks.slice(idx + 1),
					];
					return { ...module, form_blocks: newFormBlocks };
				}),
			}))
		);
		try {
			if (cloned) {
				await addComplianceFormBlock({ module_id: moduleId, ...cloned });
				updateLastUpdatedAt();
			}
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to duplicate form block", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	return { addFormBlock, updateFormBlock, deleteFormBlock, duplicateFormBlock };
}
