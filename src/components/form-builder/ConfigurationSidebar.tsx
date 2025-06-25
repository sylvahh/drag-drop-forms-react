
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfigurationSidebar: React.FC = () => {
  const { selectedElement, setSelectedElement } = useFormBuilder();

  if (!selectedElement) {
    return (
      <div className="w-80 bg-background border-l border-border flex items-center justify-center">
        <p className="text-muted-foreground text-center px-4">
          Select an element to configure its properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Configuration</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSelectedElement(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure {selectedElement.type || 'element'} properties here
          </p>
          {/* Configuration forms will be implemented based on element type */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConfigurationSidebar;
