
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ComplianceBuilderProvider } from "@/contexts/form-builder-context";
import Index from "./pages/Index";
import FlowList from "./pages/flow-list";
import FormBuilder from "./pages/form-builder";
import NotFound from "./pages/NotFound";
import { clientQuery } from "./config/query-client-config";
import { Provider } from "react-redux";
import { store } from "./store";
import Dialogs from "./dialogs";

const App = () => (
	<Provider store={store}>
		<QueryClientProvider client={clientQuery}>
			<TooltipProvider>
				{/* <ComplianceBuilderProvider> */}
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Dialogs />
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/flows" element={<FlowList />} />
							<Route path="/builder/:flowId" element={<FormBuilder />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				{/* </ComplianceBuilderProvider> */}
			</TooltipProvider>
		</QueryClientProvider>
	</Provider>
);

export default App;
