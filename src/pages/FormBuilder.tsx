
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import FieldsSidebar from '@/components/form-builder/FieldsSidebar';
import FormCanvas from '@/components/form-builder/FormCanvas';
import ConfigurationDrawer from '@/components/form-builder/ConfigurationDrawer';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormBuilder: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const { 
    flows, 
    selectedFlow, 
    setSelectedFlow, 
    previewMode, 
    setPreviewMode,
    autoSave 
  } = useFormBuilder();
  const { toast } = useToast();

  useEffect(() => {
    if (flowId) {
      const flow = flows.find(f => f.id === flowId);
      if (flow) {
        setSelectedFlow(flow);
      }
    }
  }, [flowId, flows, setSelectedFlow]);

  const handleSave = () => {
    autoSave();
    toast({
      title: "Success",
      description: "Form configuration saved successfully",
    });
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (!selectedFlow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Flow not found</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{selectedFlow.name}</h1>
            <p className="text-sm text-muted-foreground">{selectedFlow.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={togglePreview}>
              {previewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative">
          {!previewMode && <FieldsSidebar />}
          <FormCanvas />
          <ConfigurationDrawer />
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
