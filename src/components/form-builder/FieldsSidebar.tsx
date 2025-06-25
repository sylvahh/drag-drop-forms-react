
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import DraggableFieldItem from './DraggableFieldItem';
import { FieldType } from '@/types/form';
import { 
  Type, 
  Mail, 
  Hash, 
  Calendar,
  FileText,
  Phone,
  Link,
  Upload,
  CheckCircle,
  Circle,
  ChevronDown,
  Info,
  Heading1,
  AlignLeft,
  Layout,
  Package,
  Layers
} from 'lucide-react';

interface FieldDefinition {
  type: FieldType;
  title: string;
  description: string;
  category: 'field' | 'structure';
}

interface StructuralElement {
  type: 'form_block' | 'super_block' | 'section' | 'module';
  title: string;
  description: string;
  category: 'structure';
  icon: React.ReactNode;
}

const fieldDefinitions: FieldDefinition[] = [
  {
    type: 'text',
    title: 'Text Input',
    description: 'Single line text input field',
    category: 'field'
  },
  {
    type: 'email',
    title: 'Email',
    description: 'Email address input with validation',
    category: 'field'
  },
  {
    type: 'number',
    title: 'Number',
    description: 'Numeric input field with constraints',
    category: 'field'
  },
  {
    type: 'date',
    title: 'Date',
    description: 'Date picker with format options',
    category: 'field'
  },
  {
    type: 'tel',
    title: 'Phone',
    description: 'Phone number input field',
    category: 'field'
  },
  {
    type: 'url',
    title: 'URL',
    description: 'Website URL input field',
    category: 'field'
  },
  {
    type: 'file',
    title: 'File Upload',
    description: 'File upload component',
    category: 'field'
  },
  {
    type: 'radio',
    title: 'Radio Button',
    description: 'Single selection from multiple options',
    category: 'field'
  },
  {
    type: 'checkbox',
    title: 'Checkbox',
    description: 'Multiple selection options',
    category: 'field'
  },
  {
    type: 'dropdown',
    title: 'Dropdown',
    description: 'Select from dropdown list',
    category: 'field'
  },
  {
    type: 'header',
    title: 'Header',
    description: 'Section header or title',
    category: 'field'
  },
  {
    type: 'paragraph',
    title: 'Paragraph',
    description: 'Multi-line text content',
    category: 'field'
  },
  {
    type: 'info',
    title: 'Info Block',
    description: 'Information, warning, or note block',
    category: 'field'
  },
];

const structuralElements: StructuralElement[] = [
  {
    type: 'section',
    title: 'Section',
    description: 'Group modules together',
    category: 'structure',
    icon: <Layout className="w-5 h-5" />
  },
  {
    type: 'module',
    title: 'Module',
    description: 'Container for form fields',
    category: 'structure',
    icon: <Package className="w-5 h-5" />
  },
  {
    type: 'form_block',
    title: 'Form Block',
    description: 'Grouped form fields with title',
    category: 'structure',
    icon: <Layers className="w-5 h-5" />
  },
  {
    type: 'super_block',
    title: 'Super Block',
    description: 'Repeatable form sections',
    category: 'structure',
    icon: <Layers className="w-5 h-5" />
  },
];

const FieldsSidebar: React.FC = () => {
  return (
    <div className="w-80 bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Form Builder</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag elements to build your form
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Structure Elements */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Structure</h3>
            <div className="space-y-2">
              {structuralElements.map((element) => (
                <div
                  key={element.type}
                  className="flex items-start space-x-3 p-3 border rounded-lg cursor-grab hover:bg-accent hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                    {element.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{element.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{element.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Form Fields</h3>
            <div className="space-y-2">
              {fieldDefinitions.map((field) => (
                <DraggableFieldItem
                  key={field.type}
                  fieldType={field.type}
                  title={field.title}
                  description={field.description}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FieldsSidebar;
