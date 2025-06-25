
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import DraggableFieldItem from './DraggableFieldItem';
import { FieldType } from '@/types/form';

interface FieldDefinition {
  type: FieldType;
  title: string;
  description: string;
}

const fieldDefinitions: FieldDefinition[] = [
  {
    type: 'text',
    title: 'Text Input',
    description: 'Single line text input field'
  },
  {
    type: 'email',
    title: 'Email',
    description: 'Email address input with validation'
  },
  {
    type: 'number',
    title: 'Number',
    description: 'Numeric input field with constraints'
  },
  {
    type: 'date',
    title: 'Date',
    description: 'Date picker with format options'
  },
  {
    type: 'tel',
    title: 'Phone',
    description: 'Phone number input field'
  },
  {
    type: 'url',
    title: 'URL',
    description: 'Website URL input field'
  },
  {
    type: 'file',
    title: 'File Upload',
    description: 'File upload component'
  },
  {
    type: 'radio',
    title: 'Radio Button',
    description: 'Single selection from multiple options'
  },
  {
    type: 'checkbox',
    title: 'Checkbox',
    description: 'Multiple selection options'
  },
  {
    type: 'dropdown',
    title: 'Dropdown',
    description: 'Select from dropdown list'
  },
  {
    type: 'header',
    title: 'Header',
    description: 'Section header or title'
  },
  {
    type: 'paragraph',
    title: 'Paragraph',
    description: 'Multi-line text content'
  },
  {
    type: 'info',
    title: 'Info Block',
    description: 'Information, warning, or note block'
  },
];

const FieldsSidebar: React.FC = () => {
  return (
    <div className="w-80 bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Form Fields</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag fields to add them to your form
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {fieldDefinitions.map((field) => (
            <DraggableFieldItem
              key={field.type}
              fieldType={field.type}
              title={field.title}
              description={field.description}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FieldsSidebar;
