
import React from 'react';
import { Section } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { Button } from '@/components/ui/button';
import { Plus, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ModuleRenderer from './ModuleRenderer';

interface SectionRendererProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const { addModule, setSelectedElement } = useFormBuilder();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleAddModule = () => {
    addModule(section.id);
  };

  const handleConfigureSection = () => {
    setSelectedElement({ ...section, type: 'section' });
  };

  return (
    <div className="border rounded-lg bg-card ml-4">
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
            <Button variant="outline" size="sm" onClick={handleAddModule}>
              <Plus className="w-4 h-4 mr-1" />
              Add Module
            </Button>
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {section.modules.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p>No modules yet. Add your first module.</p>
                <Button className="mt-2" size="sm" onClick={handleAddModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
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
