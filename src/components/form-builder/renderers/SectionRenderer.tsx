
import React from 'react';
import { Section } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ModuleRenderer from './ModuleRenderer';

interface SectionRendererProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const { addModule, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const [{ isOver }, drop] = useDrop({
    accept: 'STRUCTURE',
    drop: (item: { structureType: string }) => {
      if (item.structureType === 'module') {
        addModule(section.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureSection = () => {
    setSelectedElement({ ...section, type: 'section' });
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
              <h4 className="font-semibold">{section.title}</h4>
              {section.description && (
                <p className="text-sm text-muted-foreground">{section.description}</p>
              )}
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleConfigureSection}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {section.modules.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                <p>Drag a Module here</p>
              </div>
            ) : (
              section.modules.map((module) => (
                <ModuleRenderer key={module.id} module={module} />
              ))
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SectionRenderer;
