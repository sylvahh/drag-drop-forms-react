import * as React from "react";
import {
	ComplianceFlow,
	ComplianceSection,
	ComplianceModule,
	ComplianceFormBlock,
	ComplianceSuperBlock,
	ComplianceFieldRow,
	ComplianceSuperBlockModule,
	ComplianceField,
	ComplianceElementType,
} from "@/types/compliance.types";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import getCompliance from "@/services/compliance/get-compliance";
import updateCompliance from "@/services/compliance/update-compliance";
import { toast } from "sonner";
import ensureError from "@/lib/ensure-error";
import { useSections } from "./use-sections";
import { useModules } from "./use-modules";
import { useFormBlocks } from "./use-form-blocks";
import { useSuperBlocks } from "./use-super-blocks";
import { useFieldRows } from "./use-field-rows";
import { useSuperBlockModules } from "./use-super-block-modules";
import { useFields } from "./use-fields";
import { cloneModule } from "./clone-utils";
import addComplianceModule from "@/services/compliance/modules/add-compliance-module";

type SelectedConfigurationType = {
	type: ComplianceElementType;
	id: string;
};

interface FormBuilderContextType {
	isFetching: boolean;
	isError: boolean;
	error: Error | null;
	complianceFlow: ComplianceFlow | null;
	lastUpdatedAt: string;
	updating: boolean;
	sections: ComplianceSection[];
	selectedConfigurationType: SelectedConfigurationType | null;
	updateSelectedConfigurationType: (type: ComplianceElementType, id: string) => void;
	resetSelectedConfigurationType: () => void;
	updateComplianceFlow: (flow: Partial<ComplianceFlow>) => void;
	addSection: (flowId: string) => void;
	updateSection: (section: ComplianceSection) => void;
	deleteSection: (sectionId: string) => void;
	duplicateSection: (flowId: string, sectionId: string) => Promise<void>;
	addModule: (sectionId: string) => void;
	updateModule: (module: ComplianceModule) => void;
	deleteModule: (moduleId: string) => void;
	addFormBlock: (moduleId: string) => void;
	updateFormBlock: (formBlock: ComplianceFormBlock) => void;
	deleteFormBlock: (formBlockId: string) => void;
	duplicateFormBlock: (moduleId: string, formBlockId: string) => Promise<void>;
	addSuperBlock: (moduleId: string) => void;
	updateSuperBlock: (superBlock: ComplianceSuperBlock) => void;
	deleteSuperBlock: (superBlockId: string, moduleId: string) => void;
	duplicateSuperBlock: (moduleId: string, superBlockId: string) => Promise<void>;
	addFieldRow: (
		parentId: string,
		parentType: "form_block" | "module" | "super_block_module"
	) => void;
	updateFieldRow: (
		fieldRow: ComplianceFieldRow,
		parentType: "form_block" | "module" | "super_block_module"
	) => void;
	deleteFieldRow: (
		fieldRowId: string,
		parentId: string,
		parentType: "form_block" | "module" | "super_block_module"
	) => void;
	duplicateFieldRow: (
		fieldRowId: string,
		parentId: string,
		parentType: "form_block" | "module" | "super_block_module"
	) => Promise<void>;
	addSuperBlockModule: (superBlockId: string) => void;
	updateSuperBlockModule: (superBlockModule: ComplianceSuperBlockModule) => void;
	deleteSuperBlockModule: (superBlockModuleId: string, superBlockId: string) => void;
	addField: (fieldRowId: string, fieldType: string, fieldData?: Partial<ComplianceField>) => void;
	updateField: (field: ComplianceField) => void;
	deleteField: (fieldId: string, fieldRowId: string) => void;
	duplicateModule: (sectionId: string, moduleId: string) => Promise<void>;
	duplicateSuperBlockModule: (superBlockId: string, superBlockModuleId: string) => Promise<void>;
	duplicateField: (fieldId: string, fieldRowId: string) => Promise<void>;
}

const FormBuilderContext = React.createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder  = () => {
	const context = React.useContext(FormBuilderContext);
	if (!context) {
		throw new Error("useFormBuilder must be used within a FormBuilderProvider");
	}
	return context;
};

export const ComplianceBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [updating, setUpdating] = React.useState(false);
	const [complianceFlow, setComplianceFlow] = React.useState<ComplianceFlow | null>(null);
	const [sections, setSections] = React.useState<ComplianceSection[]>([]);
	const [lastUpdatedAt, setLastUpdatedAt] = React.useState("");
	const [selectedConfigurationType, setSelectedConfigurationType] =
		React.useState<SelectedConfigurationType | null>(null);
	const { params } = useCustomNavigation();
	const flowId = params.flowId;

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["compliance-flow", flowId],
		queryFn: () => getCompliance({ id: flowId }),
		enabled: !!flowId,
	});

	const updateLastUpdatedAt = React.useCallback(() => {
		setLastUpdatedAt(new Date().toISOString());
	}, []);

	React.useEffect(() => {
		if (data) {
			setComplianceFlow(data);
			setSections(data.sections ?? []);
			setLastUpdatedAt(data.updated_at);
		}
	}, [data]);

	const { addSection, updateSection, deleteSection, duplicateSection } = useSections(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const { addModule, updateModule, deleteModule, duplicateModule } = useModules(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const { addFormBlock, updateFormBlock, deleteFormBlock, duplicateFormBlock } = useFormBlocks(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const { addSuperBlock, updateSuperBlock, deleteSuperBlock, duplicateSuperBlock } = useSuperBlocks(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const { addFieldRow, updateFieldRow, deleteFieldRow, duplicateFieldRow } = useFieldRows(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const {
		addSuperBlockModule,
		updateSuperBlockModule,
		deleteSuperBlockModule,
		duplicateSuperBlockModule,
	} = useSuperBlockModules(setSections, updateLastUpdatedAt, setUpdating);
	const { addField, updateField, deleteField, duplicateField } = useFields(
		setSections,
		updateLastUpdatedAt,
		setUpdating
	);
	const updateComplianceFlow = React.useCallback(
		async (flow: ComplianceFlow) => {
			if (!flowId) return;
			setUpdating(true);
			try {
				const updatedFlow = await updateCompliance({ id: flowId, ...flow });
				setComplianceFlow((prev) => ({ ...prev, ...updatedFlow }));
				updateLastUpdatedAt();
				toast.success("Compliance flow updated successfully");
			} catch (error) {
				const errorMsg = ensureError(error).message;
				toast.error("Failed to update compliance flow", {
					description: errorMsg,
				});
			} finally {
				setUpdating(false);
			}
		},
		[flowId]
	);

	const resetSelectedConfigurationType = React.useCallback(() => {
		setSelectedConfigurationType(null);
	}, []);

	const updateSelectedConfigurationType = React.useCallback(
		(type: ComplianceElementType, id: string) => {
			setSelectedConfigurationType({ type, id });
		},
		[]
	);

	const value: FormBuilderContextType = {
		isFetching,
		isError,
		error,
		updating,
		sections,
		complianceFlow,
		lastUpdatedAt,
		selectedConfigurationType,
		updateSelectedConfigurationType,
		resetSelectedConfigurationType,
		updateComplianceFlow,
		addSection,
		updateSection,
		deleteSection,
		duplicateSection,
		addModule,
		updateModule,
		deleteModule,
		addFormBlock,
		updateFormBlock,
		deleteFormBlock,
		duplicateFormBlock,
		addSuperBlock,
		updateSuperBlock,
		deleteSuperBlock,
		duplicateSuperBlock,
		addFieldRow,
		updateFieldRow,
		deleteFieldRow,
		duplicateFieldRow,
		addSuperBlockModule,
		updateSuperBlockModule,
		deleteSuperBlockModule,
		duplicateSuperBlockModule,
		addField,
		updateField,
		deleteField,
		duplicateField,
		duplicateModule,
	};

	return <FormBuilderContext.Provider value={value}>{children}</FormBuilderContext.Provider>;
};
