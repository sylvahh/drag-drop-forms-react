import AppDialog from "@/components/app/app-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import { ComplianceSuperBlockModule } from "@/types/compliance.types";
import FieldRowsPreview from "./field-rows-preview";
import AppButton from "@/components/app/app-button";
import { ArrowRight } from "lucide-react";

type Props = {
	superBlockModules: ComplianceSuperBlockModule[];
	open: boolean;
	close: () => void;
};
export default function SuperBlockModulesPreview({ superBlockModules, open, close }: Props) {
	return (
		<AppDialog
			open={open}
			onClose={close}
			title=""
			description=""
			titleClassName="text-center body-2 text-neutral-700"
			headerContainerClassName="border-b !py-0 !flex !items-center"
			containerClassName="!pt-0 !w-full min-w-[40rem] !max-w-fit"
			showCloseButton={false}
		>
			{superBlockModules.length < 2 ? (
				<SuperBlockModulesPreviewContent
					superBlockModule={superBlockModules[0]}
					actions={<Actions idx={0} modules={superBlockModules} />}
				/>
			) : (
				<SuperBlockModuleTabs modules={superBlockModules} />
			)}
		</AppDialog>
	);
}

function SuperBlockModuleTabs({ modules }: { modules: ComplianceSuperBlockModule[] }) {
	const { queryParams } = useCustomNavigation();
	const activeModule =
		queryParams.get("super_block_module") ?? modules.find((item) => !item.is_completed)?.id;
	const click = (moduleId: string) => {
		queryParams.set("super_block_module", moduleId);
	};

	return (
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
					<SuperBlockModulesPreviewContent
						superBlockModule={item}
						actions={<Actions idx={idx} modules={modules} />}
					/>

					{/* <div className="flex justify-between">
								{idx !== 0 && <AppButton variant="outline">Back</AppButton>}
								{idx !== arr.length - 1 && <AppButton>Proceed</AppButton>}
							</div> */}
				</TabsContent>
			))}
		</Tabs>
	);
}

function SuperBlockModulesPreviewContent({
	superBlockModule,
	actions,
}: {
	superBlockModule: ComplianceSuperBlockModule;
	actions: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4 ">
			<div className="flex flex-col gap-2">
				<h2 className="heading-6">{superBlockModule.title}</h2>
				{/* <p className="body-2 text-neutral-700">{superBlockModule.description}</p> */}
			</div>
			{superBlockModule.field_rows.map((fieldRow) => {
				return <FieldRowsPreview key={fieldRow.id} fieldRow={fieldRow} />;
			})}
			{actions}
		</div>
	);
}

function Actions({ idx, modules }: { idx: number; modules: ComplianceSuperBlockModule[] }) {
	const { queryParams } = useCustomNavigation();

	const handleProceed = () => {
		queryParams.set("super_block_module", modules[idx + 1].id);
	};

	const handleSubmit = () => {
		// queryParams.set("module", modules[idx + 1].id);
	};

	const handleBack = () => {
		queryParams.set("super_block_module", modules[idx - 1].id);
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
