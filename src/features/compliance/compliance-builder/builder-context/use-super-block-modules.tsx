import { ComplianceSuperBlockModule, ComplianceSection } from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceSuperBlockModule from "@/services/compliance/super-block/add-compliance-super-block-module";
import updateComplianceSuperBlockModule from "@/services/compliance/super-block/update-compliance-super-block-module";
import deleteComplianceSuperBlockModule from "@/services/compliance/super-block/delete-compliance-super-block-module";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { cloneSuperBlockModule } from "./clone-utils";

export function useSuperBlockModules(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	// Add Super Block Module
	const addSuperBlockModule = React.useCallback(async (superBlockId: string) => {
		if (!superBlockId) return;
		const newSuperBlockModule: ComplianceSuperBlockModule = {
			id: uuidv4(),
			super_block_id: superBlockId,
			title: "New Super Block Module",
			field_rows: [],
			max_entries: null,
			min_entries: null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		setSections((prev) =>
			prev.map((section) => ({
				...section,
				modules: section.modules.map((module) => ({
					...module,
					super_blocks: module.super_blocks.map((superBlock) =>
						superBlock.id === superBlockId
							? {
									...superBlock,
									super_block_modules: [...superBlock.super_block_modules, newSuperBlockModule],
							  }
							: superBlock
					),
				})),
			}))
		);
		setUpdating(true);
		try {
			await addComplianceSuperBlockModule({ superBlockId, ...newSuperBlockModule });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add super block module", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	// Update Super Block Module
	const updateSuperBlockModule = React.useCallback(
		async (superBlockModule: ComplianceSuperBlockModule) => {
			if (!superBlockModule.id) return;
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => ({
						...module,
						super_blocks: module.super_blocks.map((superBlock) =>
							superBlock.id === superBlockModule.super_block_id
								? {
										...superBlock,
										super_block_modules: superBlock.super_block_modules.map((sbm) =>
											sbm.id === superBlockModule.id ? superBlockModule : sbm
										),
								  }
								: superBlock
						),
					})),
				}))
			);
			setUpdating(true);
			try {
				await updateComplianceSuperBlockModule(superBlockModule);
				updateLastUpdatedAt();
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to update super block module", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	// Delete Super Block Module
	const deleteSuperBlockModule = React.useCallback(
		async (superBlockModuleId: string, superBlockId: string) => {
			if (!superBlockModuleId) return;
			setUpdating(true);
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => ({
						...module,
						super_blocks: module.super_blocks.map((superBlock) =>
							superBlock.id === superBlockId
								? {
										...superBlock,
										super_block_modules: superBlock.super_block_modules.filter(
											(sbm) => sbm.id !== superBlockModuleId
										),
								  }
								: superBlock
						),
					})),
				}))
			);
			try {
				await deleteComplianceSuperBlockModule({ id: superBlockModuleId });
				updateLastUpdatedAt();
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to delete super block module", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	// Duplicate Super Block Module
	const duplicateSuperBlockModule = React.useCallback(
		async (superBlockId: string, superBlockModuleId: string) => {
			setUpdating(true);
			let cloned: ComplianceSuperBlockModule | null = null;
			setSections((prev) =>
				prev.map((section) => ({
					...section,
					modules: section.modules.map((module) => ({
						...module,
						super_blocks: module.super_blocks.map((superBlock) => {
							if (superBlock.id !== superBlockId) return superBlock;
							const idx = superBlock.super_block_modules.findIndex(
								(sbm) => sbm.id === superBlockModuleId
							);
							if (idx === -1) return superBlock;
							const original = superBlock.super_block_modules[idx];
							cloned = cloneSuperBlockModule(original, superBlockId);
							const newSuperBlockModules = [
								...superBlock.super_block_modules.slice(0, idx + 1),
								cloned,
								...superBlock.super_block_modules.slice(idx + 1),
							];
							return { ...superBlock, super_block_modules: newSuperBlockModules };
						}),
					})),
				}))
			);
			try {
				if (cloned) {
					await addComplianceSuperBlockModule({ superBlockId, ...cloned });
					updateLastUpdatedAt();
				}
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to duplicate super block module", { description: errorMsg });
			} finally {
				setUpdating(false);
			}
		},
		[]
	);

	return {
		addSuperBlockModule,
		updateSuperBlockModule,
		deleteSuperBlockModule,
		duplicateSuperBlockModule,
	};
}
