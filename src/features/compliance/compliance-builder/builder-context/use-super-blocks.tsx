import { ComplianceSuperBlock, ComplianceSection } from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceSuperBlock from "@/services/compliance/super-block/add-compliance-super-block";
import updateComplianceSuperBlock from "@/services/compliance/super-block/update-compliance-super-block";
import deleteComplianceSuperBlock from "@/services/compliance/super-block/delete-compliance-super-block";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { cloneSuperBlock } from "./clone-utils";

export function useSuperBlocks(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	// Add Super Block
	const addSuperBlock = React.useCallback(async (moduleId: string) => {
		if (!moduleId) return;
		const newSuperBlock: ComplianceSuperBlock = {
			id: uuidv4(),
			module_id: moduleId,
			title: "New Super Block",
			description: "",
			super_block_modules: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) =>
					module.id === moduleId
						? { ...module, super_blocks: [...module.super_blocks, newSuperBlock] }
						: module
				),
			}))
		);
		setUpdating(true);
		try {
			await addComplianceSuperBlock({ module_id: moduleId, ...newSuperBlock });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add super block", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Update Super Block
	const updateSuperBlock = React.useCallback(async (superBlock: ComplianceSuperBlock) => {
		if (!superBlock.id) return;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) =>
					module.id === superBlock.module_id
						? {
								...module,
								super_blocks: module.super_blocks.map((sb) =>
									sb.id === superBlock.id ? superBlock : sb
								),
						  }
						: module
				),
			}))
		);
		setUpdating(true);
		try {
			await updateComplianceSuperBlock({ id: superBlock.id, ...superBlock });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to update super block", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Delete Super Block
	const deleteSuperBlock = React.useCallback(async (superBlockId: string, moduleId: string) => {
		if (!superBlockId) return;
		setUpdating(true);
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) =>
					module.id === moduleId
						? {
								...module,
								super_blocks: module.super_blocks.filter((sb) => sb.id !== superBlockId),
						  }
						: module
				),
			}))
		);
		try {
			await deleteComplianceSuperBlock({ id: superBlockId });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to delete super block", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Duplicate Super Block
	const duplicateSuperBlock = React.useCallback(async (moduleId: string, superBlockId: string) => {
		setUpdating(true);
		let cloned: ComplianceSuperBlock | null = null;
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => {
					if (module.id !== moduleId) return module;
					const idx = module.super_blocks.findIndex((sb) => sb.id === superBlockId);
					if (idx === -1) return module;
					const original = module.super_blocks[idx];
					cloned = cloneSuperBlock(original, moduleId);
					// Insert after the original
					const newSuperBlocks = [
						...module.super_blocks.slice(0, idx + 1),
						cloned,
						...module.super_blocks.slice(idx + 1),
					];
					return { ...module, super_blocks: newSuperBlocks };
				}),
			}))
		);
		try {
			if (cloned) {
				await addComplianceSuperBlock({ module_id: moduleId, ...cloned });
				updateLastUpdatedAt();
			}
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to duplicate super block", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	return { addSuperBlock, updateSuperBlock, deleteSuperBlock, duplicateSuperBlock };
}
