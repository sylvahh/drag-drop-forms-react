
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FlowRenderer from './renderers/FlowRenderer';
import FormPreview from './FormPreview';

const FormCanvas: React.FC = () => {
  const { selectedFlow, previewMode } = useFormBuilder();

  if (!selectedFlow) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">No flow selected</p>
      </div>
    );
  }

  if (previewMode) {
    return (
      <div className="flex-1 bg-background">
        <FormPreview flow={selectedFlow} />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-muted/30">
      <ScrollArea className="h-full">
        <div className="p-6">
          <FlowRenderer flow={selectedFlow} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormCanvas;
