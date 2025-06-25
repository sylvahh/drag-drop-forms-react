
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormInput, Layers, Settings, Eye } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Form Builder
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create sophisticated, multi-step forms with drag-and-drop functionality. 
            Build complex hierarchical structures with flows, sections, modules, and blocks.
          </p>
          <Button size="lg" onClick={() => navigate('/flows')} className="text-lg px-8 py-3">
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FormInput className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Drag & Drop</CardTitle>
              <CardDescription>
                Intuitive drag-and-drop interface for building forms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Layers className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Hierarchical Structure</CardTitle>
              <CardDescription>
                Organize forms with flows, sections, modules, and blocks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Settings className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Rich Configuration</CardTitle>
              <CardDescription>
                Extensive customization options for every element
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Real-time Preview</CardTitle>
              <CardDescription>
                See your forms in action with live preview mode
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to build your first form?</h2>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate('/flows')}>
              View Flows
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
