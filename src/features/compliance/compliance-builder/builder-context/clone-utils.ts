import { v4 as uuidv4 } from "uuid";
import {
	ComplianceModule,
	ComplianceFormBlock,
	ComplianceSuperBlock,
	ComplianceSuperBlockModule,
	ComplianceFieldRow,
	ComplianceField,
	ComplianceSection,
} from "@/types/compliance.types";

export function cloneField(field: ComplianceField, newFieldRowId: string): ComplianceField {
	return {
		...field,
		id: uuidv4(),
		field_row_id: newFieldRowId,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneFieldRow(
	row: ComplianceFieldRow,
	newParentIds: Partial<ComplianceFieldRow>
): ComplianceFieldRow {
	const newId = uuidv4();
	return {
		...row,
		id: newId,
		...newParentIds,
		fields: row.fields.map((field) => cloneField(field, newId)),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneFormBlock(
	block: ComplianceFormBlock,
	newModuleId: string
): ComplianceFormBlock {
	const newId = uuidv4();
	return {
		...block,
		id: newId,
		module_id: newModuleId,
		field_rows: block.field_rows.map((row) =>
			cloneFieldRow(row, { form_block_id: newId, module_id: null, super_block_module_id: null })
		),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneSuperBlockModule(
	module: ComplianceSuperBlockModule,
	newSuperBlockId: string
): ComplianceSuperBlockModule {
	const newId = uuidv4();
	return {
		...module,
		id: newId,
		super_block_id: newSuperBlockId,
		field_rows: module.field_rows.map((row) =>
			cloneFieldRow(row, { super_block_module_id: newId, form_block_id: null, module_id: null })
		),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneSuperBlock(
	block: ComplianceSuperBlock,
	newModuleId: string
): ComplianceSuperBlock {
	const newId = uuidv4();
	return {
		...block,
		id: newId,
		module_id: newModuleId,
		super_block_modules: block.super_block_modules.map((mod) => cloneSuperBlockModule(mod, newId)),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneModule(module: ComplianceModule): ComplianceModule {
	const newId = uuidv4();
	return {
		...module,
		id: newId,
		field_rows: module.field_rows.map((row) =>
			cloneFieldRow(row, { module_id: newId, form_block_id: null, super_block_module_id: null })
		),
		form_blocks: module.form_blocks.map((block) => cloneFormBlock(block, newId)),
		super_blocks: module.super_blocks.map((block) => cloneSuperBlock(block, newId)),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export function cloneSection(section: ComplianceSection, newFlowId: string): ComplianceSection {
	const newId = uuidv4();
	return {
		...section,
		id: newId,
		flow_id: newFlowId,
		modules: section.modules.map((module) => {
			const clonedModule = cloneModule(module);
			return { ...clonedModule, section_id: newId };
		}),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}
