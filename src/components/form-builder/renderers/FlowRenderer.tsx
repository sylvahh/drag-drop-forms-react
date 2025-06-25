
import React from 'react';
import { Flow } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { Button } from '@/components/ui/button';
import { Plus, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionRenderer from './SectionRenderer';

interface FlowRendererProps {
  flow: Flow;
}

const FlowRenderer: React.FC<FlowRendererProps> = ({ flow }) => {
  const { addSection, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleAddSection = () => {
    addSection(flow.id);
  };

  const handleConfigureFlow = () => {
    setSelectedElement({ ...flow, type: 'flow' });
  };

  return (
    <div className="border rounded-lg bg-background">
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
            <Button variant="outline" size="sm" onClick={handleAddSection}>
              <Plus className="w-4 h-4 mr-1" />
              Add Section
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {flow.sections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sections yet. Add your first section to get started.</p>
                <Button className="mt-4" onClick={handleAddSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Section
                </Button>
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
