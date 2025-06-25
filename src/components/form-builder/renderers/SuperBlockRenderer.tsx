
import React from 'react';
import { SuperBlock } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SuperBlockModuleRenderer from './SuperBlockModuleRenderer';

interface SuperBlockRendererProps {
  superBlock: SuperBlock;
}

const SuperBlockRenderer: React.FC<SuperBlockRendererProps> = ({ superBlock }) => {
  const { addSuperBlockModule, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: 'STRUCTURE',
    drop: (item: { structureType: string }) => {
      if (item.structureType === 'module') {
        addSuperBlockModule(superBlock.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureSuperBlock = () => {
    setSelectedElement({ ...superBlock, type: 'super_block' });
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-accent/30 ml-4 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-3 border-b">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <div className="text-left">
              <h6 className="font-medium text-sm">{superBlock.title}</h6>
              {superBlock.description && (
                <p className="text-xs text-muted-foreground">{superBlock.description}</p>
              )}
              <div className="flex space-x-4 text-xs text-muted-foreground mt-1">
                {superBlock.min_entries && <span>Min: {superBlock.min_entries}</span>}
                {superBlock.max_entries && <span>Max: {superBlock.max_entries}</span>}
              </div>
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureSuperBlock}>
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-3 space-y-3">
            {superBlock.super_block_modules.map((superBlockModule) => (
              <SuperBlockModuleRenderer key={superBlockModule.id} superBlockModule={superBlockModule} />
            ))}
            
            {superBlock.super_block_modules.length === 0 && (
              <div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p className="text-sm">Drag a Module here</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SuperBlockRenderer;
