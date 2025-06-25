
import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  Flow, 
  Section, 
  Module, 
  FormBlock, 
  SuperBlock, 
  SuperBlockModule, 
  FieldRow, 
  Field,
  InputField,
  SelectField,
  DateField,
  InfoBlockField,
  TextBlockField
} from '@/types/form';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderContextType {
  flows: Flow[];
  selectedFlow: Flow | null;
  selectedElement: any;
  previewMode: boolean;
  setFlows: (flows: Flow[]) => void;
  setSelectedFlow: (flow: Flow | null) => void;
  setSelectedElement: (element: any) => void;
  setPreviewMode: (preview: boolean) => void;
  createFlow: (name: string, description: string) => Flow;
  updateFlow: (flowId: string, updates: Partial<Flow>) => void;
  deleteFlow: (flowId: string) => void;
  addSection: (flowId: string) => Section;
  addModule: (sectionId: string) => Module;
  addFormBlock: (moduleId: string) => FormBlock;
  addSuperBlock: (moduleId: string) => SuperBlock;
  addSuperBlockModule: (superBlockId: string) => SuperBlockModule;
  addFieldRow: (parentId: string, parentType: 'module' | 'form_block' | 'super_block_module') => FieldRow;
  addField: (fieldRowId: string, fieldType: string) => Field;
  updateElement: (elementId: string, elementType: string, updates: any) => void;
  deleteElement: (elementId: string, elementType: string) => void;
  autoSave: () => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const createFlow = useCallback((name: string, description: string): Flow => {
    const newFlow: Flow = {
      id: uuidv4(),
      name,
      description,
      sections: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFlows(prev => [...prev, newFlow]);
    return newFlow;
  }, []);

  const updateFlow = useCallback((flowId: string, updates: Partial<Flow>) => {
    setFlows(prev => prev.map(flow => 
      flow.id === flowId ? { ...flow, ...updates, updatedAt: new Date() } : flow
    ));
    if (selectedFlow?.id === flowId) {
      setSelectedFlow(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  }, [selectedFlow]);

  const deleteFlow = useCallback((flowId: string) => {
    setFlows(prev => prev.filter(flow => flow.id !== flowId));
    if (selectedFlow?.id === flowId) {
      setSelectedFlow(null);
    }
  }, [selectedFlow]);

  const addSection = useCallback((flowId: string): Section => {
    const newSection: Section = {
      id: uuidv4(),
      flow_id: flowId,
      title: 'New Section',
      description: '',
      modules: [],
    };
    
    setFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { ...flow, sections: [...flow.sections, newSection], updatedAt: new Date() }
        : flow
    ));
    
    if (selectedFlow?.id === flowId) {
      setSelectedFlow(prev => prev ? {
        ...prev,
        sections: [...prev.sections, newSection],
        updatedAt: new Date()
      } : null);
    }
    
    return newSection;
  }, [selectedFlow]);

  const addModule = useCallback((sectionId: string): Module => {
    const newModule: Module = {
      id: uuidv4(),
      section_id: sectionId,
      title: 'New Module',
      description: '',
      field_rows: [],
      form_blocks: [],
      super_blocks: [],
    };

    setFlows(prev => prev.map(flow => ({
      ...flow,
      sections: flow.sections.map(section =>
        section.id === sectionId
          ? { ...section, modules: [...section.modules, newModule] }
          : section
      ),
      updatedAt: new Date()
    })));

    if (selectedFlow) {
      setSelectedFlow(prev => prev ? ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? { ...section, modules: [...section.modules, newModule] }
            : section
        ),
        updatedAt: new Date()
      }) : null);
    }

    return newModule;
  }, [selectedFlow]);

  const addFormBlock = useCallback((moduleId: string): FormBlock => {
    const newFormBlock: FormBlock = {
      id: uuidv4(),
      module_id: moduleId,
      title: 'New Form Block',
      description: '',
      field_rows: [],
    };

    const updateFlowsAndSelected = (flows: Flow[]) => flows.map(flow => ({
      ...flow,
      sections: flow.sections.map(section => ({
        ...section,
        modules: section.modules.map(module =>
          module.id === moduleId
            ? { ...module, form_blocks: [...module.form_blocks, newFormBlock] }
            : module
        )
      })),
      updatedAt: new Date()
    }));

    setFlows(updateFlowsAndSelected);
    if (selectedFlow) {
      setSelectedFlow(prev => prev ? updateFlowsAndSelected([prev])[0] : null);
    }

    return newFormBlock;
  }, [selectedFlow]);

  const addSuperBlock = useCallback((moduleId: string): SuperBlock => {
    const newSuperBlock: SuperBlock = {
      id: uuidv4(),
      module_id: moduleId,
      title: 'New Super Block',
      description: '',
      max_entries: null,
      min_entries: null,
      super_block_modules: [],
    };

    const updateFlowsAndSelected = (flows: Flow[]) => flows.map(flow => ({
      ...flow,
      sections: flow.sections.map(section => ({
        ...section,
        modules: section.modules.map(module =>
          module.id === moduleId
            ? { ...module, super_blocks: [...module.super_blocks, newSuperBlock] }
            : module
        )
      })),
      updatedAt: new Date()
    }));

    setFlows(updateFlowsAndSelected);
    if (selectedFlow) {
      setSelectedFlow(prev => prev ? updateFlowsAndSelected([prev])[0] : null);
    }

    return newSuperBlock;
  }, [selectedFlow]);

  const addSuperBlockModule = useCallback((superBlockId: string): SuperBlockModule => {
    const newSuperBlockModule: SuperBlockModule = {
      id: uuidv4(),
      super_block_id: superBlockId,
      title: 'New Super Block Module',
      field_rows: [],
    };

    const updateFlowsAndSelected = (flows: Flow[]) => flows.map(flow => ({
      ...flow,
      sections: flow.sections.map(section => ({
        ...section,
        modules: section.modules.map(module => ({
          ...module,
          super_blocks: module.super_blocks.map(superBlock =>
            superBlock.id === superBlockId
              ? { ...superBlock, super_block_modules: [...superBlock.super_block_modules, newSuperBlockModule] }
              : superBlock
          )
        }))
      })),
      updatedAt: new Date()
    }));

    setFlows(updateFlowsAndSelected);
    if (selectedFlow) {
      setSelectedFlow(prev => prev ? updateFlowsAndSelected([prev])[0] : null);
    }

    return newSuperBlockModule;
  }, [selectedFlow]);

  const addFieldRow = useCallback((parentId: string, parentType: 'module' | 'form_block' | 'super_block_module'): FieldRow => {
    const newFieldRow: FieldRow = {
      id: uuidv4(),
      form_block_id: parentType === 'form_block' ? parentId : null,
      super_block_module_id: parentType === 'super_block_module' ? parentId : null,
      module_id: parentType === 'module' ? parentId : null,
      layout: '1-column',
      fields: [],
    };

    const updateFlowsAndSelected = (flows: Flow[]) => flows.map(flow => ({
      ...flow,
      sections: flow.sections.map(section => ({
        ...section,
        modules: section.modules.map(module => {
          if (parentType === 'module' && module.id === parentId) {
            return { ...module, field_rows: [...module.field_rows, newFieldRow] };
          }
          if (parentType === 'form_block') {
            return {
              ...module,
              form_blocks: module.form_blocks.map(formBlock =>
                formBlock.id === parentId
                  ? { ...formBlock, field_rows: [...formBlock.field_rows, newFieldRow] }
                  : formBlock
              )
            };
          }
          if (parentType === 'super_block_module') {
            return {
              ...module,
              super_blocks: module.super_blocks.map(superBlock => ({
                ...superBlock,
                super_block_modules: superBlock.super_block_modules.map(superBlockModule =>
                  superBlockModule.id === parentId
                    ? { ...superBlockModule, field_rows: [...superBlockModule.field_rows, newFieldRow] }
                    : superBlockModule
                )
              }))
            };
          }
          return module;
        })
      })),
      updatedAt: new Date()
    }));

    setFlows(updateFlowsAndSelected);
    if (selectedFlow) {
      setSelectedFlow(prev => prev ? updateFlowsAndSelected([prev])[0] : null);
    }

    return newFieldRow;
  }, [selectedFlow]);

  const addField = useCallback((fieldRowId: string, fieldType: string): Field => {
    const baseField = {
      id: uuidv4(),
      field_row_id: fieldRowId,
      type: fieldType as any,
      hint_text: '',
    };

    let newField: Field;

    switch (fieldType) {
      case 'text':
      case 'email':
      case 'url':
      case 'tel':
      case 'file':
        newField = {
          ...baseField,
          label: `New ${fieldType} field`,
          required: false,
          placeholder: '',
          description: '',
        } as InputField;
        break;
      case 'number':
        newField = {
          ...baseField,
          label: 'New number field',
          required: false,
          placeholder: '',
          description: '',
          min_value: undefined,
          max_value: undefined,
          step: 1,
        } as InputField;
        break;
      case 'date':
        newField = {
          ...baseField,
          label: 'New date field',
          required: false,
          placeholder: '',
          description: '',
          date_type: 'date',
          date_format: 'DD/MM/YYYY',
        } as DateField;
        break;
      case 'radio':
      case 'checkbox':
        newField = {
          ...baseField,
          label: `New ${fieldType} field`,
          required: false,
          description: '',
          options: [
            { id: uuidv4(), field_id: baseField.id, label: 'Option 1', value: 'option1' },
            { id: uuidv4(), field_id: baseField.id, label: 'Option 2', value: 'option2' },
          ],
        } as InputField;
        break;
      case 'dropdown':
        newField = {
          ...baseField,
          label: 'New dropdown field',
          required: false,
          placeholder: 'Select an option',
          description: '',
          multi_select: false,
          options: [
            { id: uuidv4(), field_id: baseField.id, label: 'Option 1', value: 'option1' },
            { id: uuidv4(), field_id: baseField.id, label: 'Option 2', value: 'option2' },
          ],
        } as SelectField;
        break;
      case 'info':
        newField = {
          ...baseField,
          content: 'This is an info block',
          info_type: 'info',
        } as InfoBlockField;
        break;
      case 'header':
        newField = {
          ...baseField,
          text: 'Header Text',
        } as TextBlockField;
        break;
      case 'paragraph':
        newField = {
          ...baseField,
          text: 'Paragraph text content',
        } as TextBlockField;
        break;
      default:
        newField = {
          ...baseField,
          label: 'New field',
          required: false,
        } as InputField;
    }

    const updateFlowsAndSelected = (flows: Flow[]) => flows.map(flow => ({
      ...flow,
      sections: flow.sections.map(section => ({
        ...section,
        modules: section.modules.map(module => ({
          ...module,
          field_rows: module.field_rows.map(fieldRow =>
            fieldRow.id === fieldRowId
              ? { ...fieldRow, fields: [...fieldRow.fields, newField] }
              : fieldRow
          ),
          form_blocks: module.form_blocks.map(formBlock => ({
            ...formBlock,
            field_rows: formBlock.field_rows.map(fieldRow =>
              fieldRow.id === fieldRowId
                ? { ...fieldRow, fields: [...fieldRow.fields, newField] }
                : fieldRow
            )
          })),
          super_blocks: module.super_blocks.map(superBlock => ({
            ...superBlock,
            super_block_modules: superBlock.super_block_modules.map(superBlockModule => ({
              ...superBlockModule,
              field_rows: superBlockModule.field_rows.map(fieldRow =>
                fieldRow.id === fieldRowId
                  ? { ...fieldRow, fields: [...fieldRow.fields, newField] }
                  : fieldRow
              )
            }))
          }))
        }))
      })),
      updatedAt: new Date()
    }));

    setFlows(updateFlowsAndSelected);
    if (selectedFlow) {
      setSelectedFlow(prev => prev ? updateFlowsAndSelected([prev])[0] : null);
    }

    return newField;
  }, [selectedFlow]);

  const updateElement = useCallback((elementId: string, elementType: string, updates: any) => {
    // Implementation for updating elements
    console.log('Updating element:', elementId, elementType, updates);
    autoSave();
  }, []);

  const deleteElement = useCallback((elementId: string, elementType: string) => {
    // Implementation for deleting elements
    console.log('Deleting element:', elementId, elementType);
    autoSave();
  }, []);

  const autoSave = useCallback(() => {
    // Mock auto-save function
    console.log('Auto-saving form builder state...');
  }, []);

  const value: FormBuilderContextType = {
    flows,
    selectedFlow,
    selectedElement,
    previewMode,
    setFlows,
    setSelectedFlow,
    setSelectedElement,
    setPreviewMode,
    createFlow,
    updateFlow,
    deleteFlow,
    addSection,
    addModule,
    addFormBlock,
    addSuperBlock,
    addSuperBlockModule,
    addFieldRow,
    addField,
    updateElement,
    deleteElement,
    autoSave,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};
