
import React from 'react';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';

const ConfigurationDrawer: React.FC = () => {
  const { selectedElement, setSelectedElement } = useFormBuilder();

  if (!selectedElement) return null;

  const handleClose = () => {
    setSelectedElement(null);
  };

  const getTitle = () => {
    switch (selectedElement.type) {
      case 'module':
        return 'Configure Module';
      case 'form_block':
        return 'Configure Form Block';
      case 'super_block':
        return 'Configure Super Block';
      case 'super_block_module':
        return 'Configure Super Block Module';
      case 'section':
        return 'Configure Section';
      case 'flow':
        return 'Configure Flow';
      case 'field_row':
        return 'Configure Field Row';
      case 'field':
        return 'Configure Field';
      default:
        return 'Configuration';
    }
  };

  const renderConfiguration = () => {
    switch (selectedElement.type) {
      case 'module':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="module-name">Module Name</Label>
              <Input 
                id="module-name"
                defaultValue={selectedElement.title}
                placeholder="Enter module name"
              />
            </div>
            <div>
              <Label htmlFor="module-description">Description</Label>
              <Textarea 
                id="module-description"
                defaultValue={selectedElement.description}
                placeholder="Enter module description"
              />
            </div>
          </div>
        );
      
      case 'form_block':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="form-block-title">Title</Label>
              <Input 
                id="form-block-title"
                defaultValue={selectedElement.title}
                placeholder="Enter form block title"
              />
            </div>
            <div>
              <Label htmlFor="form-block-description">Description</Label>
              <Textarea 
                id="form-block-description"
                defaultValue={selectedElement.description}
                placeholder="Enter form block description"
              />
            </div>
          </div>
        );
      
      case 'super_block':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="super-block-name">Super Block Name</Label>
              <Input 
                id="super-block-name"
                defaultValue={selectedElement.title}
                placeholder="Enter super block name"
              />
            </div>
            <div>
              <Label htmlFor="super-block-description">Description</Label>
              <Textarea 
                id="super-block-description"
                defaultValue={selectedElement.description}
                placeholder="Enter super block description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-entries">Min Entries</Label>
                <Input 
                  id="min-entries"
                  type="number"
                  defaultValue={selectedElement.min_entries || ''}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="max-entries">Max Entries</Label>
                <Input 
                  id="max-entries"
                  type="number"
                  defaultValue={selectedElement.max_entries || ''}
                  placeholder="10"
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configuration options for {selectedElement.type} will be implemented here.
            </p>
          </div>
        );
    }
  };

  return (
    <Drawer open={!!selectedElement} onOpenChange={handleClose}>
      <DrawerContent className="fixed inset-y-0 right-0 mt-0 w-[400px] rounded-none border-l">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>{getTitle()}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 overflow-auto p-6">
          {renderConfiguration()}
        </div>
        
        <div className="border-t p-4">
          <Button className="w-full">
            Save Changes
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfigurationDrawer;
