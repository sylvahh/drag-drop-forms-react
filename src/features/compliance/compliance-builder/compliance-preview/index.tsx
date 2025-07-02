import Header from "./header";
import AppContainer from "@/components/app/container/container";
import { Tabs } from "@/components/ui/tabs";
import SectionsPreview from "./preview-renderers/structural/sections-preview";
import useCustomNavigation from "@/hooks/use-navigation";
import ModulesPreview from "./preview-renderers/structural/modules-preview";
import { useFormBuilder } from "../builder-context";
import EmptyData from "@/components/app/empty-data";
import AppButton from "@/components/app/app-button";

export default function CompliancePreview() {
	const { navigate, queryParams } = useCustomNavigation();
	const { complianceFlow, sections } = useFormBuilder();
	const compliance = complianceFlow;
	const activeSection =
		queryParams.get("section") ?? sections?.find((item) => !item.is_completed)?.id;

	const sectionModules = sections?.find((item) => item.id === activeSection)?.modules ?? [];

	const handleBack = () => {
		navigate("");
	};
	return (
		<AppContainer className="!overflow-hidden">
			<Header title={compliance?.name} showActions={sections?.length > 0} />
			{sections?.length === 0 ? (
				<EmptyData
					title="No markup found"
					text="Please add a markup to the compliance flow to preview"
					action={
						<AppButton variant="black" onClick={handleBack}>
							Go back to builder
						</AppButton>
					}
				/>
			) : (
				<Tabs
					defaultValue={activeSection}
					className="h-[calc(100vh-6rem)] flex justify-between py-5 !overflow-hidden"
				>
					<SectionsPreview sections={sections} />
					<ModulesPreview modules={sectionModules} sectionId={activeSection} />
				</Tabs>
			)}
		</AppContainer>
	);
}
