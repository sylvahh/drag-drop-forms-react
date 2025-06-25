
import React from 'react';
import { Field, InputField, DateField, SelectField, InfoBlockField, TextBlockField } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface FieldRendererProps {
  field: Field;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const { setSelectedElement } = useFormBuilder();

  const handleConfigureField = () => {
    setSelectedElement({ ...field, type: 'field' });
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'tel':
        const inputField = field as InputField;
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">{inputField.label}</label>
            <input
              type={field.type}
              placeholder={inputField.placeholder}
              className="w-full p-2 border rounded-md bg-muted/50"
              disabled
            />
          </div>
        );
      
      case 'number':
        const numberField = field as InputField;
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">{numberField.label}</label>
            <input
              type="number"
              placeholder={numberField.placeholder}
              className="w-full p-2 border rounded-md bg-muted/50"
              disabled
            />
          </div>
        );
      
      case 'date':
        const dateField = field as DateField;
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">{dateField.label}</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md bg-muted/50"
              disabled
            />
          </div>
        );
      
      case 'radio':
        const radioField = field as InputField;
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{radioField.label}</label>
            <div className="space-y-1">
              {radioField.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <input type="radio" disabled />
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'checkbox':
        const checkboxField = field as InputField;
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{checkboxField.label}</label>
            <div className="space-y-1">
              {checkboxField.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <input type="checkbox" disabled />
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'dropdown':
        const selectField = field as SelectField;
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">{selectField.label}</label>
            <select className="w-full p-2 border rounded-md bg-muted/50" disabled>
              <option>{selectField.placeholder}</option>
              {selectField.options?.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'file':
        const fileField = field as InputField;
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium">{fileField.label}</label>
            <input
              type="file"
              className="w-full p-2 border rounded-md bg-muted/50"
              disabled
            />
          </div>
        );
      
      case 'header':
        const headerField = field as TextBlockField;
        return <h3 className="text-lg font-semibold">{headerField.text}</h3>;
      
      case 'paragraph':
        const paragraphField = field as TextBlockField;
        return <p className="text-sm text-muted-foreground">{paragraphField.text}</p>;
      
      case 'info':
        const infoField = field as InfoBlockField;
        const getBgColor = (type: string) => {
          switch (type) {
            case 'warning':
              return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            case 'note':
              return 'bg-blue-100 border-blue-300 text-blue-800';
            default:
              return 'bg-gray-100 border-gray-300 text-gray-800';
          }
        };
        
        return (
          <div className={`p-3 border rounded-md ${getBgColor(infoField.info_type)}`}>
            <p className="text-sm">{infoField.content}</p>
          </div>
        );
      
      default:
        return (
          <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
            Unknown field type: {field.type}
          </div>
        );
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button variant="outline" size="sm" onClick={handleConfigureField}>
          <Settings className="w-3 h-3" />
        </Button>
      </div>
      {renderField()}
    </div>
  );
};

export default FieldRenderer;
