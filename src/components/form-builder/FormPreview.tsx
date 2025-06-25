
import React from 'react';
import { Flow } from '@/types/form';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormPreviewProps {
  flow: Flow;
}

const FormPreview: React.FC<FormPreviewProps> = ({ flow }) => {
  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{flow.name}</h1>
          <p className="text-muted-foreground">{flow.description}</p>
        </div>
        
        <div className="space-y-8">
          {flow.sections.map((section, sectionIndex) => (
            <div key={section.id} className="bg-background border rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                {section.description && (
                  <p className="text-muted-foreground">{section.description}</p>
                )}
              </div>
              
              <div className="space-y-6">
                {section.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-xl font-semibold mb-1">{module.title}</h3>
                      {module.description && (
                        <p className="text-muted-foreground text-sm">{module.description}</p>
                      )}
                    </div>
                    
                    {/* Direct module field rows */}
                    {module.field_rows.map((fieldRow) => (
                      <div key={fieldRow.id} className={`grid gap-4 ${
                        fieldRow.layout === '1-column' ? 'grid-cols-1' :
                        fieldRow.layout === '2-column' ? 'grid-cols-1 md:grid-cols-2' :
                        'grid-cols-1 md:grid-cols-3'
                      }`}>
                        {fieldRow.fields.map((field) => (
                          <div key={field.id}>
                            {/* Render actual form fields here */}
                            <div className="text-sm text-muted-foreground">
                              Field: {field.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    
                    {/* Form blocks */}
                    {module.form_blocks.map((formBlock) => (
                      <div key={formBlock.id} className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{formBlock.title}</h4>
                        {formBlock.description && (
                          <p className="text-sm text-muted-foreground mb-4">{formBlock.description}</p>
                        )}
                        
                        <div className="space-y-4">
                          {formBlock.field_rows.map((fieldRow) => (
                            <div key={fieldRow.id} className={`grid gap-4 ${
                              fieldRow.layout === '1-column' ? 'grid-cols-1' :
                              fieldRow.layout === '2-column' ? 'grid-cols-1 md:grid-cols-2' :
                              'grid-cols-1 md:grid-cols-3'
                            }`}>
                              {fieldRow.fields.map((field) => (
                                <div key={field.id}>
                                  <div className="text-sm text-muted-foreground">
                                    Field: {field.type}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Super blocks */}
                    {module.super_blocks.map((superBlock) => (
                      <div key={superBlock.id} className="bg-accent/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{superBlock.title} (Repeatable)</h4>
                        {superBlock.description && (
                          <p className="text-sm text-muted-foreground mb-4">{superBlock.description}</p>
                        )}
                        
                        <div className="space-y-4">
                          {superBlock.super_block_modules.map((superBlockModule) => (
                            <div key={superBlockModule.id} className="bg-background/50 p-3 rounded">
                              <h5 className="font-medium mb-2">{superBlockModule.title}</h5>
                              
                              <div className="space-y-3">
                                {superBlockModule.field_rows.map((fieldRow) => (
                                  <div key={fieldRow.id} className={`grid gap-3 ${
                                    fieldRow.layout === '1-column' ? 'grid-cols-1' :
                                    fieldRow.layout === '2-column' ? 'grid-cols-1 md:grid-cols-2' :
                                    'grid-cols-1 md:grid-cols-3'
                                  }`}>
                                    {fieldRow.fields.map((field) => (
                                      <div key={field.id}>
                                        <div className="text-sm text-muted-foreground">
                                          Field: {field.type}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {flow.sections.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No sections in this flow yet.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default FormPreview;
