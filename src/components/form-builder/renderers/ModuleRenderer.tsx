
import React from 'react';
import { Module } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import FormBlockRenderer from './FormBlockRenderer';
import SuperBlockRenderer from './SuperBlockRenderer';
import FieldRowRenderer from './FieldRowRenderer';

interface ModuleRendererProps {
  module: Module;
}

const ModuleRenderer: React.FC<ModuleRendererProps> = ({ module }) => {
  const { addFormBlock, addSuperBlock, addFieldRow, addField, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: ['FIELD', 'STRUCTURE'],
    drop: (item: { fieldType?: string; structureType?: string }) => {
      if (item.fieldType) {
        // Add field row first, then add field to it
        const newFieldRow = addFieldRow(module.id, 'module');
        addField(newFieldRow.id, item.fieldType);
      } else if (item.structureType) {
        if (item.structureType === 'form_block') {
          addFormBlock(module.id);
        } else if (item.structureType === 'super_block') {
          addSuperBlock(module.id);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureModule = () => {
    setSelectedElement({ ...module, type: 'module' });
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-card ml-4 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-4 border-b">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <div className="text-left">
              <h5 className="font-semibold">{module.title}</h5>
              {module.description && (
                <p className="text-sm text-muted-foreground">{module.description}</p>
              )}
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureModule}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {/* Direct Field Rows */}
            {module.field_rows.map((fieldRow) => (
              <FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
            ))}
            
            {/* Form Blocks */}
            {module.form_blocks.map((formBlock) => (
              <FormBlockRenderer key={formBlock.id} formBlock={formBlock} />
            ))}
            
            {/* Super Blocks */}
            {module.super_blocks.map((superBlock) => (
              <SuperBlockRenderer key={superBlock.id} superBlock={superBlock} />
            ))}
            
            {module.field_rows.length === 0 && module.form_blocks.length === 0 && module.super_blocks.length === 0 && (
              <div className="text-center py-6 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p>Drag fields or structure blocks here</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ModuleRenderer;
