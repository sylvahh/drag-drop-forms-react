
import React from 'react';
import { FieldRow } from '@/types/form';
import { useFormBuilder } from '@/contexts/FormBuilderContext';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Settings, Grid, Grid2X2, Grid3X3 } from 'lucide-react';
import FieldRenderer from './FieldRenderer';

interface FieldRowRendererProps {
  fieldRow: FieldRow;
}

const FieldRowRenderer: React.FC<FieldRowRendererProps> = ({ fieldRow }) => {
  const { addField, setSelectedElement } = useFormBuilder();

  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: { fieldType: string }) => {
      addField(fieldRow.id, item.fieldType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleConfigureFieldRow = () => {
    setSelectedElement({ ...fieldRow, type: 'field_row' });
  };

  const getLayoutIcon = () => {
    switch (fieldRow.layout) {
      case '1-column':
        return <Grid className="w-3 h-3" />;
      case '2-column':
        return <Grid2X2 className="w-3 h-3" />;
      case '3-column':
        return <Grid3X3 className="w-3 h-3" />;
      default:
        return <Grid className="w-3 h-3" />;
    }
  };

  const getGridCols = () => {
    switch (fieldRow.layout) {
      case '1-column':
        return 'grid-cols-1';
      case '2-column':
        return 'grid-cols-2';
      case '3-column':
        return 'grid-cols-3';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div
      ref={drop}
      className={`border rounded-lg bg-background p-3 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {getLayoutIcon()}
          <span>{fieldRow.layout}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleConfigureFieldRow}>
          <Settings className="w-3 h-3" />
        </Button>
      </div>
      
      <div className={`grid gap-3 ${getGridCols()}`}>
        {fieldRow.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} />
        ))}
        
        {fieldRow.fields.length === 0 && (
          <div className="col-span-full text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <p className="text-sm">Drop fields here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldRowRenderer;
