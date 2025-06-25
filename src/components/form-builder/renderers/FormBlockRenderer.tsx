
import React from 'react';
import { FormBlock } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import FieldRowRenderer from './FieldRowRenderer';

interface FormBlockRendererProps {
  formBlock: FormBlock;
}

const FormBlockRenderer: React.FC<FormBlockRendererProps> = ({ formBlock }) => {
  const { addFieldRow, addField, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: { fieldType: string }) => {
      const newFieldRow = addFieldRow(formBlock.id, 'form_block');
      addField(newFieldRow.id, item.fieldType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureFormBlock = () => {
    setSelectedElement({ ...formBlock, type: 'form_block' });
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-muted/50 ml-4 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-3 border-b">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <div className="text-left">
              <h6 className="font-medium text-sm">{formBlock.title}</h6>
              {formBlock.description && (
                <p className="text-xs text-muted-foreground">{formBlock.description}</p>
              )}
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureFormBlock}>
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-3 space-y-3">
            {formBlock.field_rows.map((fieldRow) => (
              <FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
            ))}
            
            {formBlock.field_rows.length === 0 && (
              <div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p className="text-sm">Drag fields here</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FormBlockRenderer;
