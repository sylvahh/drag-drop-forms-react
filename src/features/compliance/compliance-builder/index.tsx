import Render from "@/components/app/render";
import { ComplianceBuilderProvider, useFormBuilder } from "./builder-context";
import Header from "./header";
import AppContainer from "@/components/app/container/container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormElements from "./form-elements";
import BuilderCanvas from "./builder-canvas";
import ComplianceConfiguration from "./compliance-configuration";
import useCustomNavigation from "@/hooks/use-navigation";
import CompliancePreview from "./compliance-preview";

function Builder() {
	const { isFetching, isError, error } = useFormBuilder();
	return (
		<div className="h-screen overflow-hidden">
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<Header />
				<DndProvider backend={HTML5Backend}>
					<AppContainer className="!p-0 flex">
						<FormElements />
						<BuilderCanvas />
					</AppContainer>
				</DndProvider>
			</Render>
		</div>
	);
}

export default function ComplianceBuilder() {
	const { queryParams } = useCustomNavigation();
	const isPreview = queryParams.has("tab", "preview");

	return (
		<ComplianceBuilderProvider>
			{isPreview ? (
				<CompliancePreview />
			) : (
				<>
					<Builder />
					<ComplianceConfiguration />
				</>
			)}
		</ComplianceBuilderProvider>
	);
}
