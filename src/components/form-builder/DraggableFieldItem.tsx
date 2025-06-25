
import React from 'react';
import { useDrag } from 'react-dnd';
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
  AlignLeft
} from 'lucide-react';

interface DraggableFieldItemProps {
  fieldType: FieldType;
  title: string;
  description: string;
}

const fieldIcons: Record<FieldType, React.ReactNode> = {
  text: <Type className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
  number: <Hash className="w-5 h-5" />,
  date: <Calendar className="w-5 h-5" />,
  paragraph: <FileText className="w-5 h-5" />,
  tel: <Phone className="w-5 h-5" />,
  url: <Link className="w-5 h-5" />,
  file: <Upload className="w-5 h-5" />,
  checkbox: <CheckCircle className="w-5 h-5" />,
  radio: <Circle className="w-5 h-5" />,
  dropdown: <ChevronDown className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  header: <Heading1 className="w-5 h-5" />,
};

const DraggableFieldItem: React.FC<DraggableFieldItemProps> = ({ 
  fieldType, 
  title, 
  description 
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { fieldType },
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
        {fieldIcons[fieldType]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default DraggableFieldItem;
