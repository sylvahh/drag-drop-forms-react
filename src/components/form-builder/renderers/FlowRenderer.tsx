
import React from 'react';
import { Flow } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionRenderer from './SectionRenderer';

interface FlowRendererProps {
  flow: Flow;
}

const FlowRenderer: React.FC<FlowRendererProps> = ({ flow }) => {
  const { addSection, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: 'STRUCTURE',
    drop: (item: { structureType: string }) => {
      if (item.structureType === 'section') {
        addSection(flow.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureFlow = () => {
    setSelectedElement({ ...flow, type: 'flow' });
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-background ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-4 border-b">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <div className="text-left">
              <h3 className="font-semibold text-lg">{flow.name}</h3>
              <p className="text-sm text-muted-foreground">{flow.description}</p>
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureFlow}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {flow.sections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p>Drag a Section here to get started</p>
              </div>
            ) : (
              flow.sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FlowRenderer;
