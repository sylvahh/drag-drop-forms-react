import { ComplianceFlow, ComplianceSection } from "@/types/compliance.types";
import { useFormBuilder } from ".";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import addComplianceSection from "@/services/compliance/sections/add-compliance-section";
import updateComplianceSection from "@/services/compliance/sections/update-compliance-section";
import deleteComplianceSection from "@/services/compliance/sections/delete-compliance-section";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { cloneSection } from "./clone-utils";

export function useSections(
	setSections: (value: React.SetStateAction<ComplianceSection[]>) => void,
	updateLastUpdatedAt: () => void,
	setUpdating: (value: React.SetStateAction<boolean>) => void
) {
	const addSection = React.useCallback(async (flowId: string) => {
		if (!flowId) return;

		const newSection: ComplianceSection = {
			id: uuidv4(),
			flow_id: flowId,
			title: "New Section",
			description: "",
			modules: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		setSections((prev) => [...prev, newSection]);

		setUpdating(true);
		try {
			await addComplianceSection({
				flow_id: flowId,
				...newSection,
			});
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to add compliance section", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const updateSection = React.useCallback(async (section: ComplianceSection) => {
		if (!section.id) return;

		setSections((prev) => prev.map((s) => (s.id === section.id ? section : s)));

		setUpdating(true);
		try {
			await updateComplianceSection({
				id: section.id,
				...section,
			});
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to update compliance section", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	const deleteSection = React.useCallback(async (sectionId: string) => {
		if (!sectionId) return;

		setUpdating(true);
		setSections((prev) => prev.filter((section) => section.id !== sectionId));

		try {
			await deleteComplianceSection({ id: sectionId });
			updateLastUpdatedAt();
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to delete compliance section", {
				description: errorMsg,
			});
		} finally {
			setUpdating(false);
		}
	}, []);

	// Duplicate Section
	const duplicateSection = React.useCallback(async (flowId: string, sectionId: string) => {
		setUpdating(true);
		let cloned: ComplianceSection | null = null;
		setSections((prev) => {
			const idx = prev.findIndex((s) => s.id === sectionId);
			if (idx === -1) return prev;
			const original = prev[idx];
			cloned = cloneSection(original, flowId);
			const newSections = [...prev.slice(0, idx + 1), cloned, ...prev.slice(idx + 1)];
			return newSections;
		});
		try {
			if (cloned) {
				await addComplianceSection({ flow_id: flowId, ...cloned });
				updateLastUpdatedAt();
			}
		} catch (error) {
			const errorMsg = ensureError(error).message;
			toast.error("Failed to duplicate section", { description: errorMsg });
		} finally {
			setUpdating(false);
		}
	}, []);

	return { addSection, updateSection, deleteSection, duplicateSection };
}
