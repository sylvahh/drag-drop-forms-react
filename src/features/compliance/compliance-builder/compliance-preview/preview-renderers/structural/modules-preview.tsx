import Maximum from "@/components/app/container/maximum";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import { ComplianceModule } from "@/types/compliance.types";
import classNames from "classnames";
import FieldRowsPreview from "./field-rows-preview";
import FormBlockPreview from "./form-block-preview";
import SuperBlockPreview from "./super-block-preview";
import AppButton from "@/components/app/app-button";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import EmptyData from "@/components/app/empty-data";

export default function ModulesPreview({
	modules,
	sectionId,
}: {
	modules: ComplianceModule[];
	sectionId: string;
}) {
	const { queryParams } = useCustomNavigation();

	const activeModule = React.useMemo(() => {
		if (modules.length === 0) return "";

		return queryParams.get("module") ?? modules.find((item) => !item.is_completed)?.id;
	}, [queryParams, modules]);
	const container = classNames("!p-0  h-full !max-w-[40rem]");

	if (modules.length === 0)
		return (
			<EmptyData
				title="No modules found"
				text="Please add a module to the section to preview"
			/>
		);

	if (modules.length < 2)
		return (
			<TabsContent value={sectionId} asChild>
				<Maximum className={container}>
					<ModulePreviewContent
						module={modules[0]}
						actions={<Actions idx={0} modules={modules} />}
					/>
				</Maximum>
			</TabsContent>
		);

	const click = (moduleId: string) => {
		queryParams.set("module", moduleId);
	};

	return (
		<TabsContent value={sectionId} asChild>
			<Maximum className={container}>
				<Tabs defaultValue={activeModule} value={activeModule}>
					<TabsList className="bg-transparent flex gap-2 justify-start !p-0">
						{modules.map((item, idx) => {
							return (
								<TabsTrigger
									key={item.id}
									value={item.id}
									title={item.title}
									className="flex gap-2 px-1 items-center group data-[state=active]:text-primary-300 hover:text-primary-300 transition-all duration-300"
									onClick={() => click(item.id)}
								>
									<Badge
										variant="outline"
										className="flex items-center justify-center rounded-md size-5 body-3 group-hover:bg-primary-100 group-hover:text-primary-300 group-data-[state=active]:bg-primary-100 group-data-[state=active]:text-primary-300 group-data-[state=active]:border-primary-300"
									>
										{idx + 1}
									</Badge>

									<span className="body-3">Module {idx + 1}</span>
								</TabsTrigger>
							);
						})}
					</TabsList>
					{modules.map((item, idx, arr) => (
						<TabsContent value={item.id} className="!p-0">
							<ModulePreviewContent
								module={item}
								actions={<Actions idx={idx} modules={modules} />}
							/>
						</TabsContent>
					))}
				</Tabs>
			</Maximum>
		</TabsContent>
	);
}

function ModulePreviewContent({
	module,
	actions,
}: {
	module: ComplianceModule;
	actions: React.ReactNode;
}) {
	console.log(module);
	return (
		<div className="flex flex-col gap-4  h-[calc(100vh-10rem)] !overflow-y-auto pt-5 pb-10 pr-3">
			<div className="flex flex-col gap-2">
				<h2 className="heading-6">{module.title}</h2>
				<p className="body-2 text-neutral-700">{module.description}</p>
			</div>
			{module.field_rows.map((fieldRow) => {
				return <FieldRowsPreview key={fieldRow.id} fieldRow={fieldRow} />;
			})}

			{module.form_blocks.map((formBlock) => {
				return <FormBlockPreview key={formBlock.id} formBlock={formBlock} />;
			})}
			{module.super_blocks.map((superBlock) => {
				return <SuperBlockPreview key={superBlock.id} superBlock={superBlock} />;
			})}

			{actions}
		</div>
	);
}

function Actions({ idx, modules }: { idx: number; modules: ComplianceModule[] }) {
	const { queryParams } = useCustomNavigation();
	const handleProceed = () => {
		queryParams.set("module", modules[idx + 1].id);
	};

	const handleSubmit = () => {
		// queryParams.set("module", modules[idx + 1].id);
	};

	const handleBack = () => {
		queryParams.set("module", modules[idx - 1].id);
	};

	return (
		<div
			className={`flex  [&_button]:p-2 [&_button]:w-24 ${
				idx !== 0 ? "justify-between" : "justify-end"
			}`}
		>
			{idx !== 0 && (
				<AppButton variant="outline" onClick={handleBack}>
					Back
				</AppButton>
			)}
			{idx !== modules.length - 1 && (
				<AppButton
					variant="black"
					rightIcon={<ArrowRight className="size-4" />}
					className="flex justify-center  items-center"
					onClick={handleProceed}
				>
					Proceed
				</AppButton>
			)}

			{idx === modules.length - 1 && (
				<AppButton
					variant="black"
					rightIcon={<ArrowRight className="size-4" />}
					className="flex justify-center  items-center"
					onClick={handleSubmit}
				>
					Submit
				</AppButton>
			)}
		</div>
	);
}
