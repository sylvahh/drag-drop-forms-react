
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableStructureItemProps {
  structureType: 'section' | 'module' | 'form_block' | 'super_block';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DraggableStructureItem: React.FC<DraggableStructureItemProps> = ({ 
  structureType, 
  title, 
  description, 
  icon 
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'STRUCTURE',
    item: { structureType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex items-start space-x-3 p-3 border rounded-lg cursor-grab hover:bg-accent hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default DraggableStructureItem;
