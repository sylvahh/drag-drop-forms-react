
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormBuilderProvider } from "@/contexts/FormBuilderContext";
import Index from "./pages/Index";
import FlowList from "./pages/FlowList";
import FormBuilder from "./pages/FormBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FormBuilderProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flows" element={<FlowList />} />
            <Route path="/builder/:flowId" element={<FormBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormBuilderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
