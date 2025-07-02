import { ComplianceFlow, ComplianceModule, ComplianceSection } from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceModule from "@/services/compliance/modules/add-compliance-module";
import updateComplianceModule from "@/services/compliance/modules/update-compliance-module";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import deleteComplianceModule from "@/services/compliance/modules/delete-compliance-module";
import { cloneModule } from "./clone-utils";

export function useModules(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	//Module functions
	const addModule = React.useCallback(async (sectionId: string) => {
		if (!sectionId) return;
		const newModule: ComplianceModule = {
			id: uuidv4(),
			section_id: sectionId,
			title: "New Module",
			description: "",
			field_rows: [],
			form_blocks: [],
			super_blocks: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		setSections((prev) =>
			prev.map((s) => (s.id === sectionId ? { ...s, modules: [...s.modules, newModule] } : s))
		);

		setUpdating(true);
		try {
			await addComplianceModule({
				section_id: sectionId,
				...newModule,
			});
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add compliance module", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const updateModule = React.useCallback(async (module: ComplianceModule) => {
		if (!module.id) return;
		setSections((prev) =>
			prev.map((section) =>
				section.id === module.section_id
					? {
							...section,
							modules: section.modules.map((m) => (m.id === module.id ? module : m)),
					  }
					: section
			)
		);

		setUpdating(true);
		try {
			await updateComplianceModule({ id: module.id, ...module });
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

	const deleteModule = React.useCallback(async (moduleId: string) => {
		if (!moduleId) return;
		setUpdating(true);
		setSections((prev) =>
			prev.map((s) => ({
				...s,
				modules: s.modules.filter((m) => m.id !== moduleId),
			}))
		);
		try {
			await deleteComplianceModule({ id: moduleId });
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

	const duplicateModule = React.useCallback(async (sectionId: string, moduleId: string) => {
		setUpdating(true);
		let cloned: ComplianceModule | null = null;
		setSections((prev) =>
			prev.map((section) => {
				if (section.id !== sectionId) return section;
				const idx = section.modules.findIndex((m) => m.id === moduleId);
				if (idx === -1) return section;
				const original = section.modules[idx];
				cloned = cloneModule(original);
				// Insert after the original
				const newModules = [
					...section.modules.slice(0, idx + 1),
					cloned,
					...section.modules.slice(idx + 1),
				];
				return { ...section, modules: newModules };
			})
		);
		try {
			if (cloned) {
				await addComplianceModule({ section_id: sectionId, ...cloned });
				updateLastUpdatedAt();
			}
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to duplicate module", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	return { addModule, updateModule, deleteModule, duplicateModule };
}
