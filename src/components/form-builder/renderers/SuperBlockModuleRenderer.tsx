
import React from 'react';
import { SuperBlockModule } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import FieldRowRenderer from './FieldRowRenderer';

interface SuperBlockModuleRendererProps {
  superBlockModule: SuperBlockModule;
}

const SuperBlockModuleRenderer: React.FC<SuperBlockModuleRendererProps> = ({ superBlockModule }) => {
  const { addFieldRow, addField, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: { fieldType: string }) => {
      const newFieldRow = addFieldRow(superBlockModule.id, 'super_block_module');
      addField(newFieldRow.id, item.fieldType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureSuperBlockModule = () => {
    setSelectedElement({ ...superBlockModule, type: 'super_block_module' });
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-background/50 ml-4 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-3 border-b">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <div className="text-left">
              <h6 className="font-medium text-sm">{superBlockModule.title}</h6>
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureSuperBlockModule}>
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-3 space-y-3">
            {superBlockModule.field_rows.map((fieldRow) => (
              <FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
            ))}
            
            {superBlockModule.field_rows.length === 0 && (
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

export default SuperBlockModuleRenderer;
